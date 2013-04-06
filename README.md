###Introduction

这个repo是[《Node.js开发指南》](http://www.ituring.com.cn/book/1049)的书中源码兼容express.js 3.x的版本，由一名普通读者提供（而不是此书的作者）。

###Caution

* 关于express.js 2.x to 3.x，请参考[Migrating from 2.x to 3.x](https://github.com/visionmedia/express/wiki/Migrating-from-2.x-to-3.x)
* 特定于书中源码的2.x to 3.x问题，请参考[使用Express3.0实现<Node.js开发指南>中的微博系统](http://www.cnblogs.com/meteoric_cry/archive/2012/07/23/2604890.html)

###如何使用

* 安装 D:\dev\nodejs，加入 系统 path
* 安装 D:\dev\mongodb，加入 系统 path
* clone 代码 D:\dev\microblog，git clone https://github.com/wuliupo/microblog.git
* 在代码目录下运行命令：npm install
* 在代码目录下运行命令：mongod.exe --dbpath .
* 继续运行命令：node app

