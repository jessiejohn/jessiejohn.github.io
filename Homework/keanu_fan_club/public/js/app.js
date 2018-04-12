// Get a reference to the root of the Database
//https://firebase.google.com/docs/reference/js/firebase.database?authuser=0
var messageAppReference = firebase.database()
// Create a section for messages data in your db
//https://firebase.google.com/docs/reference/js/firebase.database.Reference
var messagesReference = messageAppReference.ref('messages')

$('#message-form').submit(function (event){
  event.preventDefault()
  var message = $('#message').val()
 	messagesReference.push({
    message: message,
    votes: 0,
    user: firebase.auth().currentUser.displayName,
  })
  $('#message').val('')
})

function getFanMessages() {
  // listens for changes to the `messages` node in the DB
  messageAppReference.ref('messages').on('value', function (results) {
    $('.message-board').empty()
    results.forEach(function (msg) {
      var entity = msg.val()
      var votes = entity.votes
      var user = entity.user
      var message = entity.message
      var id = msg.key
      //console.log(message, id)
      //below we add $ to the variable name just to make it clear its jquery. dont have to. its to make it very clear is jquery
      console.log(entity)
      var $li = $('<li>').text(message + '  - by : ' + user)
      // Create up vote element
    	var $upVoteElement = $('<i class="fa fa-thumbs-up pull-right">')
      
      $upVoteElement.on('click', function () {
      		updateMessage(id, ++votes)
    	})

    		// Create down vote element
   		var $downVoteElement = $('<i class="fa fa-thumbs-down pull-right">')

    	$downVoteElement.on('click', function () {
     	  updateMessage(id, --votes)
    	})

    		  // create delete element
    	var $deleteElement = $('<i class="fa fa-trash pull-right delete"></i>')

    	$deleteElement.on('click', function () {
        deleteMessage(id)
    	})

    	$li.append($deleteElement)
    	$li.append($downVoteElement)
    	$li.append($upVoteElement) 
    	$li.append('<div class="pull-right">' + votes + '</div>')
      $('.message-board').append($li)
    })
  })
}


function updateMessage (id, votes) {
	// find message whose objectId is equal to the id we're searching with
	var messageReference = messageAppReference.ref('messages/' + id)

  // update votes property
  messageReference.update({
    votes: votes,
  })
}

function deleteMessage(id) {
    // find message whose objectId is equal to the id we're searching with
	var messageReference = messageAppReference.ref('messages/' + id)
  messageReference.remove()
}

getFanMessages()

  // Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth())

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function() {
      return false;
    },
  },

  //below provides paths to sign in. So you can add multiple paths like gmail etc.https://firebase.google.com/docs/auth/web/firebaseui
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
}

ui.start('#firebaseui-auth-container', uiConfig)

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $('#sign-in-container').hide()
    $('#message-board-container').show()
  } else {
    $('#sign-in-container').show()
    $('#message-board-container').hide()
  }
})

$('#sign-out').click(function() {
    firebase.auth().signOut()
})

