module.exports = {


  friendlyName: 'View welcome page',


  description: 'Display the dashboard "Welcome" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/welcome',
      description: 'Display the welcome page for authenticated users.'
    },
    admin: {
      viewTemplatePath: 'pages/dashboard/adminWelcome',
      description: 'Display the admin page, for admins only'
    },
  },


  fn: async function (inputs, exits) {
      if(this.req.me.isSuperAdmin){
          sails.log('admin')
          return exits.admin();
      }

      return exits.success();

  }


};
