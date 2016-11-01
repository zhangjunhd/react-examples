## React-Native搭建开发环境
- 开发平台：MAC
- 目标平台：IOS

### 必须的软件
-  Homebrew
-  Node
- React Native的命令行工具（react-native-cli）
-  Xcode

		/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
		brew install node
		npm install -g react-native-cli

###  推荐安装的工具
-  Watchman:由Facebook提供的监视文件系统变更的工具。安装此工具可以提高开发时的性能（packager可以快速捕捉文件的变化从而实现实时刷新）。
-  Flow:一个静态的JS类型检查工具。
-  Nuclide:由Facebook提供的基于atom的集成开发环境，可用于编写、运行和 调试React Native应用。[Nuclide入门文档][1]
-  我们更推荐使用WebStorm或Sublime Text来编写React Native应用。

		brew install watchman
		brew install flow

### 测试安装
	zhangjundeMacBook-Pro:Documents zhangjun$ react-native init AwesomeProject
	This will walk you through creating a new React Native project in /Users/zhangjun/Documents/AwesomeProject
	Installing react-native package from npm...

	Setting up new React Native app in /Users/zhangjun/Documents/AwesomeProject
	AwesomeProject@0.0.1 /Users/zhangjun/Documents/AwesomeProject
	└── react@15.3.2 

	To run your app on iOS:
   		cd /Users/zhangjun/Documents/AwesomeProject
   		react-native run-ios
   		- or -
   		Open /Users/zhangjun/Documents/AwesomeProject/ios/		AwesomeProject.xcodeproj in Xcode
   		Hit the Run button
	To run your app on Android:
   		Have an Android emulator running (quickest way to get started), or a device connected
   		cd /Users/zhangjun/Documents/AwesomeProject
   		react-native run-android


也可以在Nuclide中打开AwesomeProject文件夹 然后[运行][2]，或是双击ios/AwesomeProject.xcodeproj文件然后在Xcode中点击Run按钮。

### 参考资料
- [搭建开发环境][4]

[1]: https://nuclide.io/docs/quick-start/getting-started/
[2]: https://nuclide.io/docs/platforms/react-native/#command-line
[3]: http://www.ruanyifeng.com/blog/2015/03/react.html
[4]: http://reactnative.cn/docs/0.36/getting-started.html