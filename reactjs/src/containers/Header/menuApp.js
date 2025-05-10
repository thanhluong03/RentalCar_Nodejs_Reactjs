export const adminMenu = [
    {
        name: 'menu.admin.manage-customer',
        menus: [
            {
                name: 'menu.admin.customer', link: '/system/user-redux'
            },
        ]
    },
    {
        name: 'menu.admin.manage-car',
        menus: [
            {
                name: 'menu.admin.car', link: '/system/car-form'
            },
            {
                name: 'menu.admin.location', link: '/system/location-form'
            }
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