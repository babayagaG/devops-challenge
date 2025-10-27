## Task 7

Please use either Python, NodeJS or BASH to write a script that will solve the problem below.

There is a hierarchy of folders and files in some of the folders.

```
/root/apple/sub1/file1.txt, file2.txt, ...
/root/apple/sub2/file3.txt, file4.txt, ...
/root/apple/file6.input, file7.output, ...
```

Not all but some of the files contain IP addresses. An IP address is a string with the following format `x.x.x.x` where each `x` is a number between 0 till 255 (inclusive).

Here is an example, we have file1.txt content below:
```
hello world 127.0.0.1
another line of ip 8.8.8.8
additionally there is correct ip 212.188.0.254 and incorrect ip 0.2.5566.47983
```

Therefore, file1.txt only has 3 correct IP address which is `127.0.0.1`, `8.8.8.8` and `212.188.0.254`. 0.2.5566.47983 is incorrect IP address.

Your job is to find all the correct IP addresses from all the files in the `/root/apple` folder and subfolders then print them out.

The output should be something similar like below:
```
127.0.0.1
8.8.8.8
212.188.0.254
76.32.66.122
53.26.200.155
128.8.0.2
57.32.76.1
43.120.33.200
57.30.10.10
57.31.111.112
49.20.55.1
77.12.40.230
61.32.60.1
198.3.6.1
6.244.70.133
44.127.69.1
53.66.110.33
254.128.30.1
0.31.3.1
68.1.0.22
127.0.3.3
```
