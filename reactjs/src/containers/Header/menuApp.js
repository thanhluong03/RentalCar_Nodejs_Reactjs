export const adminMenu = [
    { //quan ly nguoi dung
        name: 'menu.admin.manage-customer',
        menus: [
            {
                name: 'menu.admin.customer', link: '/system/user-redux'
            },
        ]
    },
    { //quan ly phong kham
        name: 'menu.admin.manage-car',
        menus: [
            {
                name: 'menu.admin.car', link: '/system/car-form'
            },
        ]
    },
    
];


export const doctorMenu = [
    {
        name: 'menu.admin.manage-user-doctor',
        menus: [
            {
                name: 'menu.doctor.manage-schedule', link: '/staff/manage-staff'
            },

        ]
    }

]