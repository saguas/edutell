module Eduapp.Constantes{
	export class Menu{
		
		static HOME:string = "home";
		static CONFIG:string = "config";
		static ADMIN:string = "admin";
		static TITLE_BASE:string = "EDUTELL ";
		static CONFIG_TITLE:string = Menu.TITLE_BASE + "CONFIGURAÇÃO";
		static ADMIN_TITLE:string = Menu.TITLE_BASE + "ADMINISTRAÇÃO";
		static HOME_TITLE:string = Menu.TITLE_BASE + "HOME";
	}

	export class Page{
		static CONFIG: string = "config";
		static CONFIG_DADOS_PESSOAIS: string = "config_dados_pessoais";
		static CONFIG_INSCRICAO:string = "config_inscricao";
		static CONFIG_CONFIRMACAO:string = "config_confirmacao";
		static ADMIN: string = "admin";
		static ADMIN_ALUNOS:string = "administracao_alunos";
		static ADMIN_PROFS:string = "administracao_profs";
		static ADMIN_EES:string = "";
		static ADMIN_ESCOLAS:string = "";
		static ADMIN_ADD:string = "";
	}
}

module Eduapp.Global{
	export class C{
		static public elem:any = {};
		//static FORMCLASSSUCCESS:string = "success";
	}
}