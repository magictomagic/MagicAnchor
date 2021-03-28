# 这是中文的 README 

Talk is Cheap, show me the code.

&&

懒惰，傲慢，急躁 是程序员的三大优秀品质

&& 

Do not repeat yourself

=> 这就是我不写的理由。

## 简单说一下

如果你在代码文件中输入注释：

`// anchor: hhyzuishuai import {1} from '{./{2}}'`

再 `ctrl + shift + p` 输入 `Hello World`，它会自动索引`//`开头后关键字`anchor`后的`anchor id`，并弹出选择列表。

你需要做的就是选择之前指定的`anchor id`，这里是`hhyzuishuai`，之后输入你用`空格`分隔开的参数。这里指定了`{1}`和`{2}`，所以可以输入为`Day1 Day2`，回车后，`Day1`替换掉`{1}`，`Day2`替换掉`{2}`，添加在注释行的上面。