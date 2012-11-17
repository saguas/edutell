/*
Meteor.publish("directory", function () {
  return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});
*/

/*
Meteor.publish("escolas", function () {
  return Escolas.find({}, {fields: {acesso: 0}});
});

Meteor.publish("dadosPessoais", function () {
  return dP.find();
});
*/ 

Meteor.startup(function() {
  
     Accounts.onCreateUser(function(options, user){ //esta função é chamada antes de Meteor.accounts.validateNewUser 
        console.log("onCreateUser user:",user);
            
        if (options.profile)
            user.profile = options.profile;
        else
            user.profile = {tipo:"Aluno"};

        //return _.extend(user,extra);//é necessário copiar o extra para user. Se não for feito os campos de extra não entram em user (no caso desta função existir).

        return user;	
     });

    Accounts.validateNewUser(function(proposedUser) {//esta função é chamada de Meteor.accounts.onCreateUser

        console.log("o utilizador proposto é: ", proposedUser);

        //esta função controla a criação de professores. Estes para fazerem o registo precisam ter na base de dados uma autorização.
        //só é permitido criar professores quando o número atribuído coincide com o email fornecido. O número pode ser o de professor, o BI ou o NIF.
        /*if (proposedUser.profile.tipo == "prof") {

            return false
        }*/

        return true;

    });

});