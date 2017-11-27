// JavaScript Document
var PluginUser = require('../plugin/user');
var PluginBlog = require('../plugin/blog');

module.exports = function (app){

	app.use(function (req, res, next){
		var user = req.session.user;
		if(user){
			//使用一次性
			app.locals.user = user;
		}else{
			app.locals.user = user;
		};
		
		next();
	});


	app.get('/', function (req, res, next){
		res.render('index', { title: '首页' });
	});
	
	//登录
	app.get('/login', PluginUser.loginNo, PluginUser.login.get);
	app.post('/login', PluginUser.login.post);
	
	//注册
	app.get('/reg', PluginUser.loginNo, PluginUser.reg.get);
	app.post('/reg', PluginUser.reg.post);
	
	//退出登录
	app.get('/logout', PluginUser.loginYes, PluginUser.logout.get);
	
	//个人资料
	app.get('/user/:_id', PluginUser.user.get);
	
	//发表微博
	app.get('/add',PluginUser.loginYes, PluginBlog.add.get);
	app.post('/add', PluginBlog.add.post);
	
	//微博列表
	app.get('/list', PluginBlog.list.get);
	
	//微博内容
	app.get('/view/:_id', PluginBlog.view.get);	
	
	//微博修改
	app.get('/list/:_id/editor', PluginBlog.editor.get);	
	app.post('/list/:_id/editor', PluginBlog.editor.post);
	
	//账号修改
	app.get('/user/:_id/editor', PluginBlog.editor.get);	
	app.post('/user/:_id/editor', PluginBlog.editor.post);	
	
}