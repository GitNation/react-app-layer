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

export const buttonStates = ['initial', 'processing', 'submitted'];

function SponsorCard({ content }) {
  const [minHeightTalkDesc, setMinHeightTalkDesc] = useState(0);
  const [buttonState, setButtonState] = useState(buttonStates[0]);
  const buttonListRef = useCallback((node) => {
    if (node !== null && window.matchMedia('(min-width: 600px)').matches) {
      setMinHeightTalkDesc(node.getBoundingClientRect().height);
    }
  }, []);
  const sponsor = content.data;

  const email = getCookie('watchMail');

  const handleClick = (e) => {
    e.preventDefault();

    if (buttonState === buttonStates[0]) {
      trackGAEvent(
        'sponsor-consent',
        'click',
        `name:${sponsor.itemID}`,
        content.isAuth,
      );

      setButtonState(buttonStates[1]);
      try {
        fetch(
          `https://script.google.com/macros/s/AKfycbxxLif_AS3Pz_WGZbYmkHla-FQdNhFUVYaJFPPJvhceE_TAdb_9dnMPVBpbLVOlGZJ6/exec?sponsor=${sponsor.itemID}&email=${email}`,
          {
            method: 'POST',
          },
        ).then(() => {
          setButtonState(buttonStates[2]);
        });
      } catch (error) {
        setButtonState(buttonStates[0]);
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
              disabled={buttonState !== buttonStates[0]}
              state={buttonState}
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
              {buttonState === buttonStates[0]
                ? "I'm interested"
                : buttonState === buttonStates[2]
                ? 'Recorded'
                : 'Processing'}
            </PopSponsorBtn>
            {email && (
              <PopSponsorBtnDisclaimer>
                allow {sponsor.itemID} to send you more details over email
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
              `name:${sponsor.itemID}`,
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
