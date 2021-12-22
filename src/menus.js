
import { i18n } from 'boot/i18n.js';
import { StorageService } from './services/storage';
let locale = StorageService.getLocale();
if (locale) {
  i18n.locale = locale;
}

export const AppMenus = {
    
	navbarTopRightItems: [],
	navbarTopLeftItems: [],
	navbarSideLeftItems: [
  {
    "path": "/home",
    "label": i18n.t('home'),
    "icon": "home",
    "iconcolor": "",
    "target": "",
    "submenu": []
  },
  {
    "path": "/patient",
    "label": i18n.t('patients'),
    "icon": "supervisor_account",
    "iconcolor": "",
    "target": "",
    "submenu": []
  },
  {
    "path": "/patient/revenue",
    "label": i18n.t('revenue'),
    "icon": "account_balance_wallet",
    "iconcolor": "",
    "target": "",
    "submenu": []
  },
  {
    "path": "/roles",
    "label": i18n.t('roles'),
    "icon": "extension",
    "iconcolor": "",
    "target": "",
    "submenu": []
  },
  {
    "path": "/permissions",
    "label": i18n.t('permissions'),
    "icon": "extension",
    "iconcolor": "",
    "target": "",
    "submenu": []
  }
],
	UsersTableHeaderItems: [
  {
    "label": i18n.t('user_id'),
    "align": "left",
    "sortable": false,
    "name": "user_id",
    "field": "user_id"
  },
  {
    "label": i18n.t('first_name'),
    "align": "left",
    "sortable": false,
    "name": "first_name",
    "field": "first_name"
  },
  {
    "label": i18n.t('last_name'),
    "align": "left",
    "sortable": false,
    "name": "last_name",
    "field": "last_name"
  },
  {
    "label": i18n.t('telephone'),
    "align": "left",
    "sortable": false,
    "name": "telephone",
    "field": "telephone"
  },
  {
    "label": i18n.t('email'),
    "align": "left",
    "sortable": false,
    "name": "email",
    "field": "email"
  },
  {
    "label": i18n.t('irda_code'),
    "align": "left",
    "sortable": false,
    "name": "irda_code",
    "field": "irda_code"
  },
  {
    "label": i18n.t('photo'),
    "align": "left",
    "sortable": false,
    "name": "photo",
    "field": "photo"
  },
  {
    "label": i18n.t('otp_code'),
    "align": "left",
    "sortable": false,
    "name": "otp_code",
    "field": "otp_code"
  },
  {
    "label": i18n.t('user_role_id'),
    "align": "left",
    "sortable": false,
    "name": "user_role_id",
    "field": "user_role_id"
  },
  {
    "label": i18n.t('action'),
    "align": "right",
    "sortable": false,
    "name": "btnactions",
    "field": ""
  }
],
	first_nameItems: [    

    ],
	PatientTableHeaderItems: [
  {
    "label": i18n.t('action'),
    "align": "right",
    "sortable": false,
    "name": "btnactions",
    "field": ""
  }
],
	CategoriesTableHeaderItems: [
  {
    "label": i18n.t('category'),
    "align": "left",
    "sortable": false,
    "name": "category",
    "field": "category"
  },
  {
    "label": i18n.t('action'),
    "align": "right",
    "sortable": false,
    "name": "btnactions",
    "field": ""
  }
],
	RolesTableHeaderItems: [
  {
    "label": i18n.t('role_id'),
    "align": "left",
    "sortable": false,
    "name": "role_id",
    "field": "role_id"
  },
  {
    "label": i18n.t('role_name'),
    "align": "left",
    "sortable": false,
    "name": "role_name",
    "field": "role_name"
  },
  {
    "label": i18n.t('action'),
    "align": "right",
    "sortable": false,
    "name": "btnactions",
    "field": ""
  }
],
	PermissionsTableHeaderItems: [
  {
    "label": i18n.t('permission_id'),
    "align": "left",
    "sortable": false,
    "name": "permission_id",
    "field": "permission_id"
  },
  {
    "label": i18n.t('role_id'),
    "align": "left",
    "sortable": false,
    "name": "role_id",
    "field": "role_id"
  },
  {
    "label": i18n.t('permission'),
    "align": "left",
    "sortable": false,
    "name": "permission",
    "field": "permission"
  },
  {
    "label": i18n.t('action'),
    "align": "right",
    "sortable": false,
    "name": "btnactions",
    "field": ""
  }
],

    exportFormats: {
        print: {
			label: 'Print',
			color: 'blue',
            icon: 'print',
            id: 'print',
            ext: '',
        },
        pdf: {
			label: 'Pdf',
			color: 'red',
            icon: 'picture_as_pdf',
            id: 'pdf',
            ext: 'pdf',
        },
        excel: {
			label: 'Excel',
			color: 'green',
            icon: 'grid_on',
            id: 'excel',
            ext: 'xlsx',
        },
        csv: {
			label: 'Csv',
			color: 'teal',
            icon: 'grid_on',
            id: 'csv',
            ext: 'csv',
        },
    },
    locales: {
  "fr": "French",
  "ru": "Russian",
  "zh_CN": "Chinese",
  "en": "English",
  "it": "Italian",
  "hi": "Hindi",
  "pt_PT": "Portuguese",
  "de": "German",
  "es": "Spanish",
  "ar": "Arabic"
}
}