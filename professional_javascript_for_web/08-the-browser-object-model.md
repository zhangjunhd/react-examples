# 8 BOM
- window对象
- location对象
- navigator对象
- screen对象
- history对象

## window 对象
BOM的核心对象是window，它表示浏览器的一个实例。在浏览器中，window对象有双重角色，它既是通过JavaScript访问浏览器窗口的一个接口，又是ECMAScript规定的Global对象。

### 全局作用域
全局变量不能通过delete操作符删除，而直接在window对象上定义的属性可以。

```html
<!DOCTYPE html>
<html>
<head>
    <title>Delete Operator Example</title>
</head>
<body>
    <p>Hello world!</p>
    <script type="text/javascript">

        var age = 29;
        window.color = "red";

        //throws an error in IE < 9, returns false in all other browsers
        delete window.age;

        //throws an error in IE < 9, returns true in all other browsers
        delete window.color;    //returns true

        alert(window.age);      //29
        alert(window.color);    //undefined

    </script>
</body>
</html>

```

### 窗口关系及框架
- [FramesetExample01.htm][1] ： 构建一个框架集。
- [frameset1.htm][2]：这个框架其中的一个框架包含了另一个框架集。

### 窗口位置
- [WindowPositionExample01.htm][3]：可以跨浏览器取得窗口左边和上边的位置。

### 窗口大小
- [WindowSizeExample01.htm][4]：虽然最终无法确定浏览器窗口本身大小，但却可以取得页面视口大小。

### 导航与打开窗口
- [PopupBlockerExample01.htm][5]：检测window.open()打开的弹出窗口是不是被屏蔽了。

### 间歇调用和超时调用
- [TimeoutExample01.htm][6]：一秒钟后显示警示框。
- [TimeoutExample02.htm][7]：取消超时调用。
- [IntervalExample01.htm][8]：间歇调用。
- [IntervalExample02.htm][9]：常用的使用间歇调用的例子。
- [TimeoutExample03.htm][10]：使用超时调用来模拟间歇调用。

## location对象
### 查询字符串参数
- [LocationExample01.htm][11]：创建一个函数，用以解析查询字符串，然后返回包含所有参数的一个对象。

### 位置操作
- [LocationReplaceExample01.htm][12]：浏览器1秒钟后重定向到www.wrox.com。

## navigator对象
### 检测插件
- [PluginDetectionExample01.htm][13]：检测插件
- [PluginDetectionExample02.htm][14]：检测IE中的插件
- [PluginDetectionExample03.htm][15]：检测所有浏览器中的插件

[1]: ch08/FramesetExample01.htm
[2]: ch08/frameset1.htm
[3]: ch08/WindowPositionExample01.htm
[4]: ch08/WindowSizeExample01.htm
[5]: ch08/PopupBlockerExample01.htm
[6]: ch08/TimeoutExample01.htm
[7]: ch08/TimeoutExample02.htm
[8]: ch08/IntervalExample01.htm
[9]: ch08/IntervalExample02.htm
[10]: ch08/TimeoutExample03.htm
[11]: ch08/LocationExample01.htm
[12]: ch08/LocationReplaceExample01.htm
[13]: ch08/PluginDetectionExample01.htm
[14]: ch08/PluginDetectionExample02.htm
[15]: ch08/PluginDetectionExample03.htm
