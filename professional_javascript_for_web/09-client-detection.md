# 9 客户端检测
- 能力检测
- 怪癖检测
- 用户代理检测

## 能力检测
- [CapabilitiesDetectionExample01.htm][1]：检测浏览器是否支持Netscapte风格插件；检测浏览器是否具备DOM1级所规定能力。

## 怪癖检测
怪癖检测（quirks detection）目的是识别浏览器的特殊行为。

- [QuirksDetectionExample01.htm][2]：IE8及更早版本存在一个bug，即如果某个实例属性与[[Enumerable]]标记为false的某个原型属性同名，那么该实例属性将不会出现在for-in循环中。
- [QuirksDetectionExample02.htm][3]：Safari3以前版本会枚举被隐藏的属性。

## 用户代理检测
- [client.js][4]：完整的用户代理字符串检测脚本，包括检测呈现引擎、平台、Windows操作系统、移动设备和游戏系统。
- [UserAgentDetectionExample01.htm][5]：使用client.js

[1]: ch09/CapabilitiesDetectionExample01.htm
[2]: ch09/QuirksDetectionExample01.htm
[3]: ch09/QuirksDetectionExample02.htm
[4]: ch09/client.js
[5]: ch09/UserAgentDetectionExample01.htm
