var Eduapp;
(function (Eduapp) {
    var Email = (function () {
        function Email(de, para, corpo, assunto, html) {
            this.de = de;
            this.para = para;
            this.corpo = corpo;
            this.assunto = assunto;
            this.html = html;
        }
        Email.prototype.sendMail = function (opt) {
            this.opt = opt;
            Meteor.call("sendMail", opt, this.de, this.para, this.corpo, this.assunto, this.html, function (error, result) {
                if(alert - error) {
                    console.log("email error ");
                } else {
                    console.log("email enviado !!! ");
                }
            });
        };
        return Email;
    })();
    Eduapp.Email = Email;    
})(Eduapp || (Eduapp = {}));
