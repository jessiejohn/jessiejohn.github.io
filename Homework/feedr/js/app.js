// API's:
// New York Times
// https://developer.nytimes.com/

// Guardian:http://open-platform.theguardian.com/explore/


// NewsApi.org
// https://newsapi.org/

// Handlebars templating:
var source = $('#article-template').html();
var template = Handlebars.compile(source);

// // 1. Setup AJAX requests to fetch data from each news source
$.ajax({
	type: 'GET',
	url: 'https://content.guardianapis.com/search?api-key=00ac655c-d8cc-41d2-8bb5-38ecf2699cdc',
	success: formatGuardianResponse
})

$.ajax({
	type: 'GET',
	url: 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=66005db66f794350a41540428565ced2',
	success: formatNytResponse
})

$.ajax({
	type: 'GET',
	url: 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=a2ceb714ea4043afa550ed651a658b06',
	success: formatNewsResponse
})

// 2. Set up functions to handle each of the above AJAX requests:
// - Use Array's .map method to transform the response into an array of objects that you will pass to the Handlebars template
// - Check out the id=article-template in index.html to see what properties the template expects
// - To properly format article dates, use new Date() and the .toLocaleDateString() method
// Note: not all articles will have all the expected properties :D

function formatNytResponse (response) {
	//console.log(response.results)
	var articles = response.results.map(function(article) {
		//defence code becuase image:article.multimedia[0].url below wont work if any one article doesnt have an image url.
		var image = function () {
			if (article.multimedia[0]) {
				return image = article.multimedia[0].url
			} else { 
				return image = 'http://pbs.twimg.com/profile_images/942784892882112513/qV4xB0I3_reasonably_small.jpg'
			}
		}

		var date = new Date (article.created_date)

		return {
			title:article.title,
			image:image(),
			date:date.toLocaleDateString(),
			type:article.section,
			link:article.url,
			publisher:'nyt'
		}
	})
	
	var articleTemplates = template(articles)
	$('#main').append(articleTemplates)
}

function formatGuardianResponse (response) {
	//console.log(response.response.results)
	var articles = response.response.results.map(function(article) {
			
		var date = new Date (article.webPublicationDate)

		return {
			title:article.webTitle,
			date:date.toLocaleDateString(),
			type:article.pillarName,
			link:article.webUrl,
			image:'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/audio/video/2014/5/28/1401283545625/Guardian-logo-016.jpg?w=300&q=55&auto=format&usm=12&fit=max&s=84e4a756e8a4861b56fcfc82edf68a5e',
			publisher: 'guardian'
		}
	})
	
	var articleTemplates = template(articles)
	$('#main').append(articleTemplates)
}

function formatNewsResponse (response) {
	console.log(response.articles)
	var articles = response.articles.map(function(article) {
			
		var image = function () {
			if (article.urlToImage) {
				return image = article.urlToImage
			} else { 
				return image = 'https://i.guim.co.uk/img/static/sys-images/Media/Pix/pictures/2013/5/30/1369897971239/News-Corp-logo-008.jpg?w=300&q=55&auto=format&usm=12&fit=max&s=a462a5eeab8f45af4f425d094eb4364d'
			}
		}

		var date = new Date (article.publishedAt)

		return {
			title:article.title,
			date:date.toLocaleDateString(),
			//type:article.,
			link:article.url,
			image:image(),
			publisher:'news'
		}
	})
	
	var articleTemplates = template(articles)
	$('#main').append(articleTemplates)
}


$('#guardian').click(openGuardian)
function openGuardian(){
	$('.news').hide()
	$('.nyt').hide()
}

$('#nyTimes').click(openNyTimes)
function openNyTimes(){
	$('.news').hide()
	$('.guardian').hide()
}

$('#news').click(openNews)
function openNews(){
	$('.guardian').hide()
	$('.nyt').hide()
}

