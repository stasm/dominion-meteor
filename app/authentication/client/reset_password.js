Template.ResetPassword.helpers({
  resetPassword: function(){
    return Session.get('resetPassword')
  }
})

Template.ResetPassword.onCreated(function() {
  if(Accounts._resetPasswordToken) {
    Session.set('resetPassword', Accounts._resetPasswordToken);
  }
})

Template.ResetPassword.events({
  'submit #resetPasswordForm': function(e, t) {
    e.preventDefault()

    var resetPasswordForm = $(e.currentTarget),
        password = resetPasswordForm.find('#resetPasswordPassword').val(),
        passwordConfirm = resetPasswordForm.find('#resetPasswordPasswordConfirm').val()

    if (!_.isEmpty(password) && password === passwordConfirm) {
      Accounts.resetPassword(Session.get('resetPassword'), password, function(err) {
        if (err) {
          alert('We are sorry but something went wrong.')
        } else {
          Session.set('resetPassword', null)
        }
      })
    }
    return false
  }
})
