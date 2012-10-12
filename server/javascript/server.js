Meteor.startup(function () {
    // code to run on server at startup
     Colors.allow({
     	insert:function(userId, doc){
     		console.log("insert userid ",userId);
     		return false;
     }});
     Accounts.validateNewUser(function(proposedUser){//esta função é chamada de de Meteor.accounts.onCreateUser
    	
    	console.log("o utilizador proposto é: ",proposedUser);
    	
    	return true;
    	
    });
    
    Accounts.onCreateUser(function(options, extra, user){ //esta função é chamada antes de Meteor.accounts.validateNewUser 
    	console.log("onCreateUser user:",user);
    	
    	return _.extend(user,extra);//é necessário copiar o extra para user. Se não for feito os campos de extra não entram em user (no caso desta função existir).
    	
    	//return user;	
    });
   
    
});