/// <reference path="../../../Definitions/mydefs/declare_vars.ts" />


Escolas = new Meteor.Collection("Escolas");
dP = new Meteor.Collection("dadosPessoais");


Meteor.users.deny({

  update: function (userId, docs, fields, modifier) { 
      //console.log("docs fields ",fields, " modifier ", _.values(modifier));
      var ret = false;

      if(fields.length == 1 && fields[0] == "profile"){
        _.each(_.values(modifier), function(val){
              console.log("val ", _.values(val));
              if(_.values(val)[0] == "Prof")
                ret = true;
          });
      }else
        ret = true;

      return ret;
    },
    fetch: ['profile']
});


Escolas.allow({
  insert: function (userId, escola) {

      var user = Meteor.users.findOne({_id: userId});  
      var tipo = user.profile.tipo;
      //console.log("user ", user);

      if(tipo == "Admin")
        return true;

      return false; // no cowboy inserts -- use createParty method
  },
  update: function (userId, parties, fields, modifier) {
      var user = Meteor.users.findOne({_id: userId});  
      var tipo = user.profile.tipo;

      if(tipo == "Admin")
        return true;

      return false; // no cowboy inserts -- use createParty method
  },
  remove: function (userId, parties) {
      var user = Meteor.users.findOne({_id: userId});  
      var tipo = user.profile.tipo;

      if(tipo == "Admin")
        return true;

      return false; // no cowboy inserts -- use createParty method
  }/*,
  fetch: ['profile']*/
});

dP.allow({
  insert: function (userId, escola) {

      return true; // no cowboy inserts -- use createParty method
  },
  update: function (userId, docs, fields, modifier) {
      console.log("userId ",userId);
      return userId? true: false;//true; // no cowboy inserts -- use createParty method
  },
  remove: function (userId, parties) {
      var user = Meteor.users.findOne({_id: userId});  
      var tipo = user.profile.tipo;

      if(tipo == "Admin")
        return true;

      return false; // no cowboy inserts -- use createParty method
  }/*,
  fetch: ['profile']*/
});

Meteor.methods({
  // options should include: title, description, x, y, public
  verifyAcesso: function (pass, arrEscolas) {
      var id = this.userId;
      console.log("update to prof userId 1 ", this.userId);
      return _.any(arrEscolas,function(escola){
            //console.log("pass ", pass, " escola ", Escolas.findOne({name:escola}));
            var pw = "";

            if (Meteor.isServer)
                pw = Escolas.findOne({name:escola}).acesso.password;
            else
                pw = Escolas.findOne({name:escola});

            if(pw == pass){
                Meteor.users.update(id,{$set:{"profile.tipo":"Prof"}});
                //dP.update({id:this.userId},{$set:obj});
                console.log("update to prof userId 2 ", id);
                return true;
            }
            else
                return false;
        })
      
  },
  addDadosPessoais: function(obj){
      obj.id = this.userId;
      console.log("obj ", obj);

      dP.insert(obj);
      return true;
  },
  addInscricao: function(obj, tipo, pass){//fundir esta função com a anterior por forma a poder alterar tipo se conhecer a password
    
  }

});


