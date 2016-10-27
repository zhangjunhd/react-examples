# DOM扩展
## 选择符API
- [SelectorsAPIExample01.htm][1]:通过Document类型调用querySelector()方法时，会在文档元素的范围内查找匹配的元素。而通过Element类型调用querySelector()方法时，只会在该元素后代元素的范围内查找匹配的元素。
- [SelectorsAPIExample02.htm][2]:只要传给querySelectorAll()方法的CSS选择符有效，该方法都会返回一个NodeList对象。
- [SelectorsAPIExample03.htm][3]:Element类型matchesSelector()方法，接收一个参数，即CSS选择符，如果调用元素与该选择符匹配，返回true；否则，返回false。

## 元素遍历
- [ElementTraversalExample01.htm][10]

## HTML5
- [OuterHTMLExample01.htm][4]:在读模式下，outerHTML返回调用它的元素及所有子节点的HTML标签。
- [GetElementsByClassNameExample01.htm][11]

## 专属扩展
- [ContainsExample02.htm][5]:这个函数组合使用了三种方式来确定一个节点是不是另一个节点的后代。
- [InnerTextExample01.htm][6]:通过innerText属性可以操作元素中包含的所有文本内容，包括子文档树中的文本。
- [InnerTextExample02.htm][7]:设置innerText属性移除了先前存在的所有子节点，完全改变了DOM子树。
- [InnerTextExample03.htm][8]:设置innerText属性的同时，也对文本中存在的HTML语法字符(小于号、大于号、引号及和号)进行了编码。
- [InnerTextExample05.htm][9]:这两个函数都接收了一个元素作为参数，然后检查这个元素是不是有textContent属性。如果有，那么type of element.textContext应该返回"string"；如果没有，那么这两个函数就会改为使用innerText。

[1]: ch11/SelectorsAPIExample01.htm
[2]: ch11/SelectorsAPIExample02.htm
[3]: ch11/SelectorsAPIExample03.htm
[4]: ch11/OuterHTMLExample01.htm
[5]: ch11/ContainsExample02.htm
[6]: ch11/InnerTextExample01.htm
[7]: ch11/InnerTextExample02.htm
[8]: ch11/InnerTextExample03.htm
[9]: ch11/InnerTextExample05.htm
[10]: ch11/ElementTraversalExample01.htm
[11]: ch11/GetElementsByClassNameExample01.htm
