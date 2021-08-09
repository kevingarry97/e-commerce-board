/* eslint-disable import/no-anonymous-default-export */
const activeMenu = (path) => {
    return window.location.pathname === path ? 'text-white bg-primary nav-link' : 'text-black-50 nav-link'
};

export const property = [
    {value: 1, label: 'Commercial'},
    {value: 2, label: 'Residentual'},
    {value: 3, label: 'Rooms for Rent'},
    {value: 4, label: 'Short Term'},
    {value: 5, label: 'Daily Term'},
  ];
  
  export const cosmetics = [
    {value: 1, label: 'Men'},
    {value: 2, label: 'Women'},
    {value: 3, label: 'Child'},
    {value: 4, label: 'Both'},
  ];
  
  export const jewelry = [
    {value: 1, label: 'Gold'},
    {value: 2, label: 'Silver'},
  ];
  
  export const rooms = [
    {value: 1, label: 'Apartment'},
    {value: 2, label: 'Lodge'},
    {value: 3, label: 'Motel'},
  ];
  
  export const other = [
    {value: 1, label: 'Used'},
    {value: 2, label: 'New'},
  ];

export default {
    activeMenu
}