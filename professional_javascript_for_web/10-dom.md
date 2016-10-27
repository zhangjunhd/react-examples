# 10 DOM
## 节点层次
### Node类型
### Document类型
- [DocumentWriteExample01.htm][1]:在页面加载过程中输出当前日期和时间。
- [DocumentWriteExample02.htm][2]:直接包含字符串"</script>"导致该字符串被解释为脚本块的结束。
- [DocumentWriteExample03.htm][3]:加转义字符"\"避免问题。
- [DocumentWriteExample04.htm][4]:使用window.onload事件处理程序，等到页面完全加载之后延迟执行函数。函数执行之后，字符串“Hello World”会重写整个页面内容。

### Element类型
- [ElementChildrenExample01.htm][25]
- [ElementChildrenExample02.htm][26]
- [GetElementByIdExample01.htm][27]
- [GetElementByIdExample02.htm][28]
- [GetElementByIdExample03.htm][29]
- [GetElementByIdExample04.htm][30]
- [GetElementsByNameExample01.htm][31]
- [GetElementsByTagNameExample01.htm][32]
- [HTMLElementsExample01.htm][5]:元素中指定的所有信息，都可以通过js代码取得。通过为每个属性赋值，可以修改对应的每个属性。
- [ElementAttributesExample02.htm][6]:因为id和align在HTML中是<div>的公认特性，因此该元素的DOM对象中也将存在对应的属性。不过，自定义特性my_special_attribute在Safari,Opera,Chrome,Firefox中是不存在的；当IE却会为自定义特性创建属性。
- [ElementAttributesExample01.htm][7]:setAttribute()如果特性存在，则更新，否则添加该特性并设置相应的值。
- [ElementAttributesExample03.htm][8]:使用一个数组来保存键值对，最后再以空格为分隔符将它们拼接起来。
- [ElementAttributesExample04.htm][9]:IE7及更早的版本会返回HTML元素中所有可能的特性，包括没有指定的特性。这个代码确保只返回指定特性。
- [CreateElementExample01.htm][10]:创建并添加元素。

### Text类型
- [TextNodeExample01.htm][11]:在取得文本节点的引用后，修改它。
- [TextNodeExample02.htm][12]:输出的字符串会经过HTML转义（小于号、大于号或引号）。
- [TextNodeExample03.htm][13]:创建一个新<div>元素并为它指定值为"message"的class特性。
- [TextNodeExample04.htm][14]:如果两个节点是相邻的同胞节点，那么这两个节点中的文本就会连起来显示，中间不会有空格。
- [TextNodeExample05.htm][15]:在一个包含两个或多个文本节点的父元素上调用normalize()方法，则会将所有文本节点合并成一个节点。
- [TextNodeExample06.htm][16]:包含"Hello World"的文本节点被分割为两个文本节点，从位置5开始。

### Comment类型
- [CommentNodeExample01.htm][17]:访问注释节点。

### CDATASection类型
- [CDataSectionNodeExample01.htm][24]

### DocumentFragment类型
- [DocumentFragmentExample01.htm][18]:先创建一个文档片段并取得对<ul>元素的引用。然后通过for循环创建3个列表项，并通过文本表示它们的顺序。

### Attr类型
- [AttrExample01.htm][19]:创建一个新的特性节点。

## DOM操作技术
### 动态脚本
- [DynamicScriptExample01.htm][20]:行内方式指定JavaScript代码。
- [DynamicScriptExample02.htm][21]:以这种方式加载的代码会在全局作用域中执行，而且当脚本执行后将立即可用。实际上，这样执行代码与全局作用域中把相同的字符串传递给eval()是一样的。

### 动态样式
- [DynamicStyleExample01.htm][22]:使用<style>元素包含嵌入式CSS。
- [DynamicStyleExample02.htm][23]:重写后的代码使用try-catch语句来捕获IE抛出的异常，然后再针对IE的特殊方式来设置样式。

### 操作表格
### 使用NodeList

[1]: ch10/DocumentWriteExample01.htm
[2]: ch10/DocumentWriteExample02.htm
[3]: ch10/DocumentWriteExample03.htm
[4]: ch10/HTMLElementsExample01.htm
[5]: ch10/HTMLElementsExample01.htm
[6]: ch10/ElementAttributesExample02.htm
[7]: ch10/ElementAttributesExample01.htm
[8]: ch10/ElementAttributesExample03.htm
[9]: ch10/ElementAttributesExample04.htm
[10]: ch10/CreateElementExample01.htm
[11]: ch10/TextNodeExample01.htm
[12]: ch10/TextNodeExample02.htm
[13]: ch10/TextNodeExample03.htm
[14]: ch10/TextNodeExample04.htm
[15]: ch10/TextNodeExample05.htm
[16]: ch10/TextNodeExample06.htm
[17]: ch10/CommentNodeExample01.htm
[18]: ch10/DocumentFragmentExample01.htm
[19]: ch10/AttrExample01.htm
[20]: ch10/DynamicScriptExample01.htm
[21]: ch10/DynamicScriptExample02.htm
[22]: ch10/DynamicStyleExample01.htm
[23]: ch10/DynamicStyleExample02.htm
[24]: ch10/CDataSectionNodeExample01.htm
[25]: ch10/ElementChildrenExample01.htm
[26]: ch10/ElementChildrenExample02.htm
[27]: ch10/GetElementByIdExample01.htm
[28]: ch10/GetElementByIdExample02.htm
[29]: ch10/GetElementByIdExample03.htm
[30]: ch10/GetElementByIdExample04.htm
[31]: ch10/GetElementsByNameExample01.htm
[32]: ch10/GetElementsByTagNameExample01.htm
