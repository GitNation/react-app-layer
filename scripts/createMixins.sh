rm -rf ./mixins
mkdir ./mixins
cat scripts/scriptHeader.tmp>./mixins/eventsBus.njk
cat temp/eventsBus.js>>./mixins/eventsBus.njk
cat scripts/scriptFooter.tmp>>./mixins/eventsBus.njk
cat templates/mixins.njk>>./mixins/eventsBus.njk
rm -rf ./temp
