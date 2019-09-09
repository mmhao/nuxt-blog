module.exports = function({store, redirect, req}) {
  let url = process.server ? req.url : window.location.href

  if (!store.state.admin.token.adminInfo) {
    process.server ? redirect('/admin/login') : window.location.replace('/admin/login')
  } else {
    if (url.indexOf('admin/login') > 0) {
      process.server ? redirect('/admin') : window.location.replace('/admin')
    }
  }

  }
