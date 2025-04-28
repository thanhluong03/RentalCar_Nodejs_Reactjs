export const adminMenu = [
    { //quan ly nguoi dung
        name: 'menu.admin.manage-total-doctor', 
        menus: [
            // {
            //     name: 'menu.admin.crud', link: '/system/user-manage'
            // },
            {
                name: 'menu.admin.manage-user', link: '/system/user-redux'
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