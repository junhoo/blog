var ModelBolg = require('../model/blog');

//微博发表
module.exports.add = {
	get: function(req, res, next) {
		res.render('add', {
			title: '发表'
		});
	},
	post: function(req, res, next) {

		var postData = {
			author: req.session.user._id,
			title: req.body.title,
			content: req.body.content
		};
		ModelBolg.create(postData, function(err, data) {

			if(err) console.log(err);
			res.redirect('/view/' + data._id);
			//res.send(data);
		});
	}
};

//微博列表
module.exports.list = {
	get: function(req, res, next) {

		var aList = ModelBolg.find({}, null, {
			sort: {
				_id: -1
			}
		}).populate('user');

		aList.exec(function(err, data) {
			if(err) console.log(err);
			res.render('list', {
				title: '微博列表',
				list: data
			});

		});
	}
};

//微博内容
module.exports.view = {
	get: function(req, res, next) {
		var getData = {
			_id: req.param('_id')
		};

		ModelBolg.findOne(getData, function(err, data) {

			if(err) console.log(err);

			if(data) {
				res.render('view', {
					title: data.title,
					view: data
				});
			} else {
				res.send('此微博，不存在！');
			}

		});

	}
};

module.exports.editor = {
	get: function(req, res, next) {
		var _id = req.param('_id')
		ModelBolg.findOne({
			_id: _id
		}, null, function(err, data) {

			res.render('editor', {
				title: data.title,
				view: data
			});
		});
		//res.send('修改');
	},
	post: function(req, res, next) {

		var body = req.body;
		var resJson = {
			status: false,
			msg: '',
			data: null
		};
		console.log('进来执行了' + body._id);
		ModelBolg.update({
			_id: body._id
		}, {
			$set: {
				title: body.title,
				content: body.content
			}
		}, function(err) {
			console.log('进来里面回调了');
			if(err) {
				resJson.msg = '修改失败';
				resJson.data = err;
			} else {
				resJson.msg = '修改成功';
				resJson.statue = true;
			}
			res.send(resJson);

		});

		//res.send('修改成功');
	}
};