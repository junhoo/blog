var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//骨架模版
var blogSchema = Schema({
	author: {
		type: ObjectId,
		ref: 'user'
	},
    title: String, //标题
	content: String //内容
});
//模型
module.exports = mongoose.model('blog', blogSchema);