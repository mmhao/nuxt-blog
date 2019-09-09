
// async function adminLogin(ctx, next) {
//   if (!session.adminInfo) {
//     ctx.redirect('/admin/login');
//     return
//   }
//   next()
// }

module.exports =  (ctx) => {
    if (!ctx.session.userInfo) {
      ctx.redirect('/login');
      return
    }
  }
// module.exports = {
//   adminLogin
// };

// exports.adminLogin = (ctx, next) => {
//   if (!session.adminInfo) {
//     ctx.redirect('/admin/login');
//     return
//   }
//   next()
// }
