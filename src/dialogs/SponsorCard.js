import React, { useState, useCallback } from 'react';
import {
  PopSponsor,
  PopSponsorTop,
  PopSponsorTitle,
  PopSponsorBio,
  PopSponsorPerk,
  PopSponsorActions,
  PopSponsorBtn,
  PopSponsorBtnDisclaimer,
  PopSponsorPerkBtn,
  PopSponsorMid,
  PopSponsorLogo,
} from './SponsorCard.styled';
import { trackGAEvent } from '../services/ga';
import { getCookie } from '../services/getCookie';

function SponsorCard({ content }) {
  const [minHeightTalkDesc, setMinHeightTalkDesc] = useState(0);
  const [buttonClicked, setButtonState] = useState(false);
  const buttonListRef = useCallback((node) => {
    if (node !== null && window.matchMedia('(min-width: 600px)').matches) {
      setMinHeightTalkDesc(node.getBoundingClientRect().height);
    }
  }, []);
  const sponsor = content.data;

  const email = getCookie('watchMail');

  const handleClick = (e) => {
    e.preventDefault();

    if (!buttonClicked) {
      // TODO: slackChannelName is used as an alternative to sponsor name, need to rebuild this with proper sponsor schema
      trackGAEvent(
        'sponsor-consent',
        'click',
        `name:${sponsor.slackChannelName}`,
        content.isAuth,
      );

      try {
        fetch(
          `https://script.google.com/macros/s/AKfycbxxLif_AS3Pz_WGZbYmkHla-FQdNhFUVYaJFPPJvhceE_TAdb_9dnMPVBpbLVOlGZJ6/exec?sponsor=${sponsor.slackChannelName}&email=${email}`,
          {
            method: 'POST',
          },
        ).then(() => {
          setButtonState(true);
        });
      } catch (error) {
        throw new Error(
          `Failed recording attendee email consent: ${error.toString()}`,
        );
      }
    }

    return false;
  };

  return (
    <PopSponsor>
      <PopSponsorTop>
        <PopSponsorLogo src={sponsor.image.url} />
        <PopSponsorActions>
          <div ref={buttonListRef}>
            <PopSponsorBtn
              disabled={buttonClicked}
              onClick={
                email
                  ? handleClick
                  : () => {
                      trackGAEvent(
                        'sponsor-consent',
                        'click',
                        `no-email`,
                        content.isAuth,
                      );
                    }
              }
              href={email ? '#' : sponsor.registerLink}
              target="_blank"
            >
              {buttonClicked ? 'Recorded' : "I'm interested"}
            </PopSponsorBtn>
            {email && (
              <PopSponsorBtnDisclaimer>
                confirm sharing your email with the partner
              </PopSponsorBtnDisclaimer>
            )}
          </div>
        </PopSponsorActions>
      </PopSponsorTop>

      <PopSponsorMid minHeight={minHeightTalkDesc}>
        <PopSponsorTitle
          dangerouslySetInnerHTML={{
            __html: sponsor.title,
          }}
        />
        <PopSponsorBio
          dangerouslySetInnerHTML={{
            __html: sponsor.subtitle,
          }}
        />
        <PopSponsorPerk
          dangerouslySetInnerHTML={{
            __html: sponsor.description,
          }}
        />

        <PopSponsorPerkBtn
          href={sponsor.registerLink}
          target="_blank"
          onClick={() => {
            trackGAEvent(
              'sponsors-offers',
              'click',
              `name:${sponsor.slackChannelName}`,
              content.isAuth,
            );
          }}
          dangerouslySetInnerHTML={{
            __html: sponsor.location,
          }}
        />
      </PopSponsorMid>
    </PopSponsor>
  );
}

export default SponsorCard;
