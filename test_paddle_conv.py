import paddle
import paddle.nn as nn
import numpy as np

try:
    print("Testing simple conv2d...")
    x = paddle.randn([1, 3, 32, 32])
    conv = nn.Conv2D(3, 6, 3)
    y = conv(x)
    print("Success!")
except Exception as e:
    print(f"Failed: {e}")
    import traceback
    traceback.print_exc()
