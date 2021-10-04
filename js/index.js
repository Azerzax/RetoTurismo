$(document).ready(beginning);

function beginning(){
  marceloScripts();
}

function marceloScripts(){
  $('a#scrollUp')
    .off('click')
    .on('click', functionName);
}