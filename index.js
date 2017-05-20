function handlebarsSetup() {
  //put any handlebars setup in here
  Handlebars.registerPartial("userDetails", $("#user-details-partial").html())
}

$(document).ready(function (){
  handlebarsSetup()
});

function searchRepositories() {
  var searched = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=` + searched, function(response) {
    const template = Handlebars.compile($('#repo-template').html())
    $('#results').html(template(response))
  }).fail(displayError())
}

function displayError() {
    $('#errors').html("There has been an error. Please try again.")
}

function showCommits(el) {
  const owner = el.dataset.owner
  const repo = el.dataset.repository
  $.get('https://api.github.com/repos/' + owner + '/' + repo + '/commits', function(response){
    const template = Handlebars.compile($('#commits-template').html())
    $('#details').html(template(response))
  }).fail(displayError())
}
