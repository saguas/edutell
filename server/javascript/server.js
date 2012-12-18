/*
Meteor.publish("directory", function () {
  return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});
*/

Meteor.publish("allUserData", function () {
  var user = Meteor.users.findOne({_id: this.userId});  
  if(user && user.profile.tipo == "Admin")
    return Meteor.users.find({}, {fields: {'profile': 1}});
  else
    return null;
});

Meteor.publish("Estados", function () {
  return Estados.find({}, {fields: {acesso: 0}});
});

Meteor.publish("escolas", function () {
  return Escolas.find({}, {fields: {acesso: 0}});
});

Meteor.publish("dadosPessoais", function (userId) {
    var user;

    console.log("userId ", userId, " this.userId ", this.userId);

    if (userId && userId === this.userId)
      user = Meteor.users.findOne({_id: this.userId});  
    else
      return null;  

    var tipo = user.profile.tipo;


    if(this.userId && tipo == "Aluno"){
      //return dP.find();
      //console.log("server ", this.userId);
      return dP.find({id: this.userId});

    }else if(this.userId && tipo == "Admin"){
      //return dP.find();
      //console.log("server ", this.userId);
       console.log("tipo ",tipo);
      return dP.find();
      
    }

    return null;
});

Meteor.methods({
    sendMail: function(opt,de,para,corpo,assunto,html){
      
          if(!opt){
              if(html){
                  Email.send({from:de, to:para,
                    html:corpo,subject:assunto});
              }else{
                  Email.send({from:de, to:para,
                      text:corpo,subject:assunto});
              }
            }else{
                Email.send(opt);
            }
      }
  
});

Meteor.startup(function() {
  
     Accounts.onCreateUser(function(options, user){ //esta função é chamada antes de Meteor.accounts.validateNewUser 
        console.log("onCreateUser user:",user);
            
        if (options.profile && options.profile.tipo == "Aluno"){
            user.profile = options.profile;
            user.profile.Estado = "pendente";
        }
        else if(options.profile){
            options.profile.tipo = "Aluno";
            user.profile = options.profile;
            user.profile.Estado = "pendente";
        }
        else{
            user.profile = {tipo:"Aluno",Estado:"pendente"};
        }
        //return _.extend(user,extra);//é necessário copiar o extra para user. Se não for feito os campos de extra não entram em user (no caso desta função existir).

        return user;	
     });

    Accounts.validateNewUser(function(proposedUser) {//esta função é chamada de Meteor.accounts.onCreateUser

        console.log("o utilizador proposto é: ", proposedUser);

        //esta função controla a criação de professores. Estes para fazerem o registo precisam ter na base de dados uma autorização.
        //só é permitido criar professores quando o número atribuído coincide com o email fornecido. O número pode ser o de professor, o BI ou o NIF.
        //if (proposedUser.profile.tipo == "prof") {

          //  return false
        //}

        return true;

    });

});
