import { INavData } from '@coreui/angular';

export const navItemsManager: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Front',
    url: '/',
    iconComponent: { name: 'cil-cursor' },
    badge: {
      color: 'info',
      text: ''
    }
  },
  {
    title: true,
    name: 'Mean'
  },
  {
    name: 'Listes utilisateur',
    url: '/user/listing',
    iconComponent: { name: 'cil-drop' }
  },
  {
    name: 'Service',
    url: '/service/listing',
    iconComponent: { name: 'cil-drop' }
  },
  {
    name: 'Listes rendez vous',
    url: '/liste-rendez-vous/listing',
    iconComponent: { name: 'cil-drop' }
  }
];




export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Front',
    url: '/',
    iconComponent: { name: 'cil-cursor' },
    badge: {
      color: 'info',
      text: ''
    }
  },
  {
    title: true,
    name: 'Mean'
  },
  {
    name: 'Listes rendez vous',
    url: '/liste-rendez-vous/listing',
    iconComponent: { name: 'cil-drop' }
  }
];
