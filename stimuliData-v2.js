var stimuliCSV =
"stimulusNum,patternName,pairNumber,leftRevealOrder,leftShape,leftSize,leftFill,rightRevealOrder,rightShape,rightSize,rightFill,xPos,yPos\n" +
"1,No-Fill-Filled,1,1,Square,Medium,Solid Fill,10,Circle,Medium,No Fill,0.884,0.42\n" +
"1,No-Fill-Filled,2,2,Circle,Small,No Fill,7,Circle,Medium,Solid Fill,0.802,0.92\n" +
"1,No-Fill-Filled,3,3,Square,Medium,Solid Fill,5,Circle,Large,No Fill,0.298,0.097\n" +
"1,No-Fill-Filled,4,4,Triangle,Medium,Solid Fill,2,Square,Small,No Fill,0.92,0.298\n" +
"1,No-Fill-Filled,5,5,Triangle,Small,Solid Fill,9,Triangle,Small,No Fill,0.097,0.198\n" +
"1,No-Fill-Filled,6,6,Triangle,Medium,Solid Fill,1,Triangle,Large,No Fill,0.198,0.601\n" +
"1,No-Fill-Filled,7,7,Square,Large,No Fill,3,Circle,Medium,Solid Fill,0.702,0.399\n" +
"1,No-Fill-Filled,8,8,Circle,Small,Solid Fill,6,Circle,Small,No Fill,0.5,0.702\n" +
"1,No-Fill-Filled,9,9,Triangle,Small,No Fill,4,Triangle,Medium,Solid Fill,0.601,0.903\n" +
"1,No-Fill-Filled,10,10,Circle,Large,Solid Fill,8,Square,Large,No Fill,0.399,0.802\n" +
"2,Circle-Triangle-Square,1,1,Circle,Medium,Solid Fill,7,Triangle,Medium,Solid Fill,0.601,0.399\n" +
"2,Circle-Triangle-Square,2,2,Circle,Small,Solid Fill,4,Triangle,Medium,No Fill,0.5,0.702\n" +
"2,Circle-Triangle-Square,3,3,Triangle,Large,No Fill,9,Square,Medium,Solid Fill,0.802,0.92\n" +
"2,Circle-Triangle-Square,4,4,Triangle,Small,Solid Fill,2,Square,Small,No Fill,0.92,0.601\n" +
"2,Circle-Triangle-Square,5,5,Square,Small,Solid Fill,10,Circle,Medium,No Fill,0.702,0.097\n" +
"2,Circle-Triangle-Square,6,6,Square,Medium,No Fill,3,Circle,Large,No Fill,0.198,0.903\n" +
"2,Circle-Triangle-Square,7,7,Triangle,Small,Solid Fill,1,Square,Large,Solid Fill,0.399,0.802\n" +
"2,Circle-Triangle-Square,8,8,Triangle,Small,Solid Fill,5,Square,Small,Solid Fill,0.097,0.5\n" +
"2,Circle-Triangle-Square,9,9,Triangle,Small,Solid Fill,8,Square,Small,No Fill,0.298,0.198\n" +
"2,Circle-Triangle-Square,10,10,Square,Medium,Solid Fill,6,Circle,Large,Solid Fill,0.903,0.298\n" +
"3,Random,1,1,Triangle,Small,No Fill,6,Triangle,Large,No Fill,0.601,0.601\n" +
"3,Random,2,2,Triangle,Large,Solid Fill,2,Circle,Medium,No Fill,0.802,0.198\n" +
"3,Random,3,3,Circle,Large,No Fill,7,Circle,Medium,No Fill,0.198,0.298\n" +
"3,Random,4,4,Circle,Large,No Fill,10,Square,Large,Solid Fill,0.097,0.903\n" +
"3,Random,5,5,Square,Medium,Solid Fill,5,Circle,Medium,Solid Fill,0.298,0.097\n" +
"3,Random,6,6,Square,Small,Solid Fill,3,Circle,Large,Solid Fill,0.702,0.92\n" +
"3,Random,7,7,Triangle,Large,No Fill,8,Triangle,Large,No Fill,0.903,0.5\n" +
"3,Random,8,8,Square,Small,Solid Fill,4,Square,Large,Solid Fill,0.399,0.702\n" +
"3,Random,9,9,Square,Large,No Fill,9,Circle,Medium,Solid Fill,0.92,0.802\n" +
"3,Random,10,10,Square,Medium,No Fill,1,Square,Medium,Solid Fill,0.5,0.399\n" +
"4,Circle-Triangle-Square,1,1,Triangle,Small,Solid Fill,3,Square,Large,Solid Fill,0.601,0.702\n" +
"4,Circle-Triangle-Square,2,2,Circle,Large,No Fill,1,Triangle,Small,No Fill,0.702,0.802\n" +
"4,Circle-Triangle-Square,3,3,Circle,Medium,Solid Fill,2,Triangle,Large,No Fill,0.399,0.399\n" +
"4,Circle-Triangle-Square,4,4,Circle,Large,Solid Fill,6,Triangle,Small,Solid Fill,0.198,0.198\n" +
"4,Circle-Triangle-Square,5,5,Circle,Small,Solid Fill,9,Triangle,Medium,Solid Fill,0.802,0.601\n" +
"4,Circle-Triangle-Square,6,6,Circle,Small,Solid Fill,10,Triangle,Large,No Fill,0.92,0.298\n" +
"4,Circle-Triangle-Square,7,7,Square,Small,Solid Fill,5,Circle,Medium,Solid Fill,0.097,0.097\n" +
"4,Circle-Triangle-Square,8,8,Square,Medium,Solid Fill,8,Circle,Medium,No Fill,0.903,0.5\n" +
"4,Circle-Triangle-Square,9,9,Triangle,Medium,No Fill,4,Square,Small,Solid Fill,0.5,0.92\n" +
"4,Circle-Triangle-Square,10,10,Triangle,Large,Solid Fill,7,Square,Small,Solid Fill,0.298,0.903\n" +
"5,Random,1,1,Square,Small,No Fill,10,Circle,Large,No Fill,0.198,0.399\n" +
"5,Random,2,2,Square,Large,No Fill,4,Circle,Large,Solid Fill,0.097,0.5\n" +
"5,Random,3,3,Triangle,Large,No Fill,9,Square,Small,No Fill,0.802,0.903\n" +
"5,Random,4,4,Circle,Large,Solid Fill,2,Triangle,Medium,Solid Fill,0.702,0.298\n" +
"5,Random,5,5,Circle,Large,No Fill,7,Circle,Medium,Solid Fill,0.5,0.097\n" +
"5,Random,6,6,Triangle,Large,Solid Fill,1,Circle,Medium,Solid Fill,0.298,0.198\n" +
"5,Random,7,7,Circle,Small,Solid Fill,5,Circle,Medium,Solid Fill,0.903,0.601\n" +
"5,Random,8,8,Square,Large,Solid Fill,3,Circle,Medium,Solid Fill,0.399,0.702\n" +
"5,Random,9,9,Triangle,Large,No Fill,8,Circle,Medium,Solid Fill,0.92,0.802\n" +
"5,Random,10,10,Circle,Medium,No Fill,6,Triangle,Large,No Fill,0.601,0.92\n" +
"6,Random,1,1,Circle,Small,No Fill,9,Triangle,Small,No Fill,0.601,0.903\n" +
"6,Random,2,2,Square,Small,No Fill,5,Circle,Small,No Fill,0.298,0.097\n" +
"6,Random,3,3,Square,Medium,Solid Fill,2,Square,Large,No Fill,0.903,0.5\n" +
"6,Random,4,4,Square,Small,Solid Fill,7,Circle,Medium,No Fill,0.92,0.702\n" +
"6,Random,5,5,Square,Large,No Fill,10,Square,Small,No Fill,0.5,0.92\n" +
"6,Random,6,6,Triangle,Small,No Fill,4,Square,Large,Solid Fill,0.399,0.399\n" +
"6,Random,7,7,Square,Small,No Fill,3,Circle,Large,No Fill,0.198,0.601\n" +
"6,Random,8,8,Triangle,Medium,No Fill,1,Triangle,Medium,Solid Fill,0.097,0.298\n" +
"6,Random,9,9,Square,Large,No Fill,6,Triangle,Large,Solid Fill,0.802,0.198\n" +
"6,Random,10,10,Circle,Medium,Solid Fill,8,Square,Small,Solid Fill,0.702,0.802\n" +
"7,Same Fill,1,1,Square,Small,Solid Fill,7,Triangle,Small,Solid Fill,0.5,0.92\n" +
"7,Same Fill,2,2,Square,Large,No Fill,3,Square,Medium,No Fill,0.702,0.097\n" +
"7,Same Fill,3,3,Circle,Medium,Solid Fill,9,Square,Large,Solid Fill,0.399,0.399\n" +
"7,Same Fill,4,4,Circle,Large,No Fill,5,Circle,Large,No Fill,0.097,0.601\n" +
"7,Same Fill,5,5,Circle,Medium,No Fill,1,Triangle,Large,No Fill,0.298,0.903\n" +
"7,Same Fill,6,6,Square,Medium,Solid Fill,6,Square,Small,Solid Fill,0.802,0.198\n" +
"7,Same Fill,7,7,Square,Small,Solid Fill,8,Triangle,Large,Solid Fill,0.198,0.5\n" +
"7,Same Fill,8,8,Square,Large,Solid Fill,10,Circle,Large,Solid Fill,0.903,0.298\n" +
"7,Same Fill,9,9,Circle,Small,Solid Fill,2,Square,Large,Solid Fill,0.601,0.702\n" +
"7,Same Fill,10,10,Square,Large,No Fill,4,Triangle,Small,No Fill,0.92,0.802\n" +
"8,Same Fill,1,1,Triangle,Small,Solid Fill,6,Triangle,Small,Solid Fill,0.601,0.702\n" +
"8,Same Fill,2,2,Triangle,Small,Solid Fill,9,Circle,Large,Solid Fill,0.903,0.5\n" +
"8,Same Fill,3,3,Triangle,Large,Solid Fill,3,Square,Small,Solid Fill,0.702,0.298\n" +
"8,Same Fill,4,4,Triangle,Small,Solid Fill,5,Square,Small,Solid Fill,0.198,0.198\n" +
"8,Same Fill,5,5,Square,Medium,No Fill,7,Square,Medium,No Fill,0.802,0.802\n" +
"8,Same Fill,6,6,Square,Large,No Fill,10,Square,Small,No Fill,0.298,0.601\n" +
"8,Same Fill,7,7,Triangle,Large,Solid Fill,8,Circle,Small,Solid Fill,0.92,0.399\n" +
"8,Same Fill,8,8,Triangle,Medium,No Fill,1,Triangle,Large,No Fill,0.097,0.903\n" +
"8,Same Fill,9,9,Circle,Large,Solid Fill,2,Triangle,Medium,Solid Fill,0.399,0.097\n" +
"8,Same Fill,10,10,Circle,Small,Solid Fill,4,Triangle,Medium,Solid Fill,0.5,0.92\n" +
"9,Large-Medium-Small,1,1,Circle,Small,No Fill,7,Square,Large,No Fill,0.198,0.802\n" +
"9,Large-Medium-Small,2,2,Triangle,Small,No Fill,9,Square,Large,Solid Fill,0.5,0.702\n" +
"9,Large-Medium-Small,3,3,Circle,Small,No Fill,1,Triangle,Large,No Fill,0.702,0.92\n" +
"9,Large-Medium-Small,4,4,Square,Medium,Solid Fill,3,Square,Small,Solid Fill,0.903,0.399\n" +
"9,Large-Medium-Small,5,5,Square,Medium,No Fill,6,Square,Small,Solid Fill,0.298,0.5\n" +
"9,Large-Medium-Small,6,6,Circle,Small,No Fill,8,Circle,Large,No Fill,0.601,0.097\n" +
"9,Large-Medium-Small,7,7,Circle,Large,Solid Fill,10,Circle,Medium,No Fill,0.802,0.903\n" +
"9,Large-Medium-Small,8,8,Square,Medium,No Fill,5,Triangle,Small,Solid Fill,0.92,0.198\n" +
"9,Large-Medium-Small,9,9,Circle,Small,No Fill,2,Square,Large,No Fill,0.097,0.601\n" +
"9,Large-Medium-Small,10,10,Square,Large,Solid Fill,4,Circle,Medium,Solid Fill,0.399,0.298\n" +
"10,Same Fill,1,1,Circle,Large,Solid Fill,10,Square,Medium,Solid Fill,0.097,0.298\n" +
"10,Same Fill,2,2,Square,Large,No Fill,3,Circle,Large,No Fill,0.702,0.5\n" +
"10,Same Fill,3,3,Triangle,Medium,No Fill,2,Triangle,Small,No Fill,0.298,0.399\n" +
"10,Same Fill,4,4,Circle,Medium,No Fill,9,Square,Large,No Fill,0.399,0.702\n" +
"10,Same Fill,5,5,Circle,Small,Solid Fill,4,Circle,Small,Solid Fill,0.601,0.601\n" +
"10,Same Fill,6,6,Circle,Large,Solid Fill,5,Circle,Small,Solid Fill,0.198,0.198\n" +
"10,Same Fill,7,7,Square,Medium,Solid Fill,1,Square,Small,Solid Fill,0.92,0.903\n" +
"10,Same Fill,8,8,Square,Small,Solid Fill,8,Square,Large,Solid Fill,0.903,0.097\n" +
"10,Same Fill,9,9,Triangle,Small,No Fill,7,Triangle,Large,No Fill,0.5,0.92\n" +
"10,Same Fill,10,10,Circle,Medium,Solid Fill,6,Circle,Medium,Solid Fill,0.802,0.802\n" +
"11,Small-Medium-Large,1,1,Square,Large,Solid Fill,7,Square,Small,No Fill,0.802,0.601\n" +
"11,Small-Medium-Large,2,2,Triangle,Large,Solid Fill,2,Circle,Small,No Fill,0.5,0.097\n" +
"11,Small-Medium-Large,3,3,Circle,Medium,No Fill,6,Triangle,Large,Solid Fill,0.903,0.5\n" +
"11,Small-Medium-Large,4,4,Circle,Large,Solid Fill,4,Triangle,Small,No Fill,0.097,0.92\n" +
"11,Small-Medium-Large,5,5,Circle,Small,No Fill,9,Square,Medium,Solid Fill,0.92,0.903\n" +
"11,Small-Medium-Large,6,6,Square,Medium,Solid Fill,10,Circle,Large,No Fill,0.198,0.399\n" +
"11,Small-Medium-Large,7,7,Square,Large,Solid Fill,8,Circle,Small,No Fill,0.702,0.802\n" +
"11,Small-Medium-Large,8,8,Circle,Small,Solid Fill,3,Square,Medium,No Fill,0.601,0.702\n" +
"11,Small-Medium-Large,9,9,Square,Medium,Solid Fill,1,Triangle,Large,Solid Fill,0.399,0.298\n" +
"11,Small-Medium-Large,10,10,Square,Small,No Fill,5,Circle,Medium,No Fill,0.298,0.198\n" +
"12,Same Size,1,1,Square,Small,No Fill,9,Square,Small,No Fill,0.903,0.92\n" +
"12,Same Size,2,2,Triangle,Large,Solid Fill,8,Circle,Large,Solid Fill,0.802,0.198\n" +
"12,Same Size,3,3,Triangle,Small,No Fill,4,Circle,Small,Solid Fill,0.601,0.601\n" +
"12,Same Size,4,4,Circle,Medium,Solid Fill,2,Triangle,Medium,Solid Fill,0.5,0.903\n" +
"12,Same Size,5,5,Circle,Medium,No Fill,10,Square,Medium,Solid Fill,0.702,0.298\n" +
"12,Same Size,6,6,Triangle,Large,Solid Fill,5,Triangle,Large,Solid Fill,0.92,0.802\n" +
"12,Same Size,7,7,Triangle,Small,Solid Fill,1,Triangle,Small,No Fill,0.198,0.5\n" +
"12,Same Size,8,8,Triangle,Large,Solid Fill,7,Triangle,Large,No Fill,0.298,0.097\n" +
"12,Same Size,9,9,Square,Medium,No Fill,6,Circle,Medium,No Fill,0.399,0.702\n" +
"12,Same Size,10,10,Triangle,Small,Solid Fill,3,Triangle,Small,No Fill,0.097,0.399\n" +
"13,Random,1,1,Circle,Large,No Fill,10,Square,Small,No Fill,0.702,0.5\n" +
"13,Random,2,2,Square,Small,No Fill,6,Circle,Large,No Fill,0.601,0.802\n" +
"13,Random,3,3,Circle,Medium,No Fill,3,Triangle,Medium,Solid Fill,0.198,0.601\n" +
"13,Random,4,4,Circle,Large,No Fill,1,Square,Large,No Fill,0.802,0.92\n" +
"13,Random,5,5,Square,Large,No Fill,9,Square,Large,No Fill,0.097,0.097\n" +
"13,Random,6,6,Circle,Large,Solid Fill,2,Circle,Small,No Fill,0.399,0.298\n" +
"13,Random,7,7,Triangle,Medium,No Fill,4,Square,Large,Solid Fill,0.298,0.399\n" +
"13,Random,8,8,Square,Large,Solid Fill,7,Square,Medium,Solid Fill,0.92,0.702\n" +
"13,Random,9,9,Triangle,Medium,Solid Fill,8,Circle,Large,No Fill,0.903,0.903\n" +
"13,Random,10,10,Square,Large,No Fill,5,Triangle,Large,Solid Fill,0.5,0.198\n" +
"14,Small-Medium-Large,1,1,Square,Large,Solid Fill,5,Square,Small,No Fill,0.198,0.399\n" +
"14,Small-Medium-Large,2,2,Triangle,Small,No Fill,8,Square,Medium,Solid Fill,0.802,0.298\n" +
"14,Small-Medium-Large,3,3,Circle,Large,Solid Fill,4,Square,Small,Solid Fill,0.903,0.903\n" +
"14,Small-Medium-Large,4,4,Circle,Large,Solid Fill,9,Square,Small,Solid Fill,0.5,0.702\n" +
"14,Small-Medium-Large,5,5,Square,Large,No Fill,10,Square,Small,Solid Fill,0.601,0.802\n" +
"14,Small-Medium-Large,6,6,Triangle,Medium,Solid Fill,6,Square,Large,No Fill,0.92,0.5\n" +
"14,Small-Medium-Large,7,7,Square,Medium,Solid Fill,1,Square,Large,No Fill,0.399,0.097\n" +
"14,Small-Medium-Large,8,8,Triangle,Large,Solid Fill,7,Square,Small,No Fill,0.702,0.92\n" +
"14,Small-Medium-Large,9,9,Triangle,Medium,Solid Fill,2,Triangle,Large,No Fill,0.298,0.601\n" +
"14,Small-Medium-Large,10,10,Triangle,Large,No Fill,3,Circle,Small,No Fill,0.097,0.198\n" +
"15,Random,1,1,Triangle,Medium,No Fill,9,Triangle,Medium,Solid Fill,0.097,0.601\n" +
"15,Random,2,2,Circle,Medium,Solid Fill,8,Triangle,Small,Solid Fill,0.399,0.198\n" +
"15,Random,3,3,Square,Large,No Fill,4,Triangle,Large,Solid Fill,0.92,0.903\n" +
"15,Random,4,4,Circle,Large,No Fill,3,Circle,Medium,No Fill,0.601,0.5\n" +
"15,Random,5,5,Triangle,Large,Solid Fill,10,Circle,Small,Solid Fill,0.702,0.702\n" +
"15,Random,6,6,Circle,Small,No Fill,1,Circle,Small,Solid Fill,0.903,0.399\n" +
"15,Random,7,7,Square,Medium,No Fill,6,Square,Large,No Fill,0.198,0.097\n" +
"15,Random,8,8,Circle,Small,No Fill,7,Triangle,Medium,Solid Fill,0.802,0.298\n" +
"15,Random,9,9,Square,Large,Solid Fill,5,Triangle,Small,Solid Fill,0.298,0.92\n" +
"15,Random,10,10,Triangle,Small,Solid Fill,2,Circle,Small,No Fill,0.5,0.802\n" +
"16,Same Size,1,1,Circle,Medium,Solid Fill,5,Square,Medium,Solid Fill,0.92,0.702\n" +
"16,Same Size,2,2,Triangle,Medium,Solid Fill,9,Triangle,Medium,Solid Fill,0.198,0.298\n" +
"16,Same Size,3,3,Square,Large,Solid Fill,10,Circle,Large,No Fill,0.097,0.399\n" +
"16,Same Size,4,4,Triangle,Small,Solid Fill,7,Square,Small,Solid Fill,0.903,0.802\n" +
"16,Same Size,5,5,Square,Large,No Fill,4,Circle,Large,No Fill,0.601,0.097\n" +
"16,Same Size,6,6,Square,Small,No Fill,2,Circle,Small,Solid Fill,0.399,0.198\n" +
"16,Same Size,7,7,Triangle,Medium,Solid Fill,1,Circle,Medium,No Fill,0.5,0.903\n" +
"16,Same Size,8,8,Square,Medium,Solid Fill,6,Circle,Medium,No Fill,0.802,0.5\n" +
"16,Same Size,9,9,Triangle,Large,Solid Fill,3,Square,Large,No Fill,0.298,0.601\n" +
"16,Same Size,10,10,Circle,Medium,Solid Fill,8,Circle,Medium,No Fill,0.702,0.92\n" +
"17,Random,1,1,Circle,Large,No Fill,9,Circle,Medium,No Fill,0.399,0.903\n" +
"17,Random,2,2,Circle,Medium,No Fill,10,Square,Large,No Fill,0.198,0.399\n" +
"17,Random,3,3,Circle,Medium,No Fill,1,Square,Small,No Fill,0.601,0.702\n" +
"17,Random,4,4,Triangle,Large,Solid Fill,2,Triangle,Medium,Solid Fill,0.5,0.5\n" +
"17,Random,5,5,Circle,Medium,No Fill,6,Triangle,Small,No Fill,0.903,0.92\n" +
"17,Random,6,6,Square,Small,Solid Fill,8,Triangle,Medium,No Fill,0.298,0.298\n" +
"17,Random,7,7,Circle,Small,No Fill,4,Circle,Large,Solid Fill,0.802,0.802\n" +
"17,Random,8,8,Circle,Small,Solid Fill,7,Circle,Large,No Fill,0.702,0.198\n" +
"17,Random,9,9,Square,Medium,Solid Fill,3,Circle,Large,No Fill,0.097,0.601\n" +
"17,Random,10,10,Circle,Large,No Fill,5,Circle,Small,No Fill,0.92,0.097\n" +
"18,Random,1,1,Triangle,Small,Solid Fill,10,Circle,Medium,No Fill,0.903,0.702\n" +
"18,Random,2,2,Square,Large,No Fill,3,Triangle,Large,No Fill,0.702,0.903\n" +
"18,Random,3,3,Square,Medium,No Fill,8,Circle,Medium,Solid Fill,0.198,0.802\n" +
"18,Random,4,4,Triangle,Small,Solid Fill,1,Square,Medium,No Fill,0.802,0.399\n" +
"18,Random,5,5,Triangle,Medium,Solid Fill,4,Triangle,Medium,Solid Fill,0.5,0.198\n" +
"18,Random,6,6,Circle,Large,Solid Fill,5,Circle,Small,Solid Fill,0.92,0.5\n" +
"18,Random,7,7,Triangle,Small,Solid Fill,7,Circle,Medium,Solid Fill,0.399,0.601\n" +
"18,Random,8,8,Triangle,Medium,Solid Fill,9,Square,Small,No Fill,0.298,0.92\n" +
"18,Random,9,9,Square,Medium,No Fill,6,Circle,Small,Solid Fill,0.601,0.298\n" +
"18,Random,10,10,Circle,Large,No Fill,2,Circle,Medium,No Fill,0.097,0.097\n" +
"19,Random,1,1,Circle,Small,Solid Fill,5,Square,Small,No Fill,0.097,0.92\n" +
"19,Random,2,2,Square,Medium,No Fill,6,Square,Medium,No Fill,0.92,0.198\n" +
"19,Random,3,3,Square,Medium,Solid Fill,2,Circle,Medium,No Fill,0.198,0.298\n" +
"19,Random,4,4,Circle,Large,Solid Fill,1,Triangle,Medium,No Fill,0.601,0.5\n" +
"19,Random,5,5,Square,Medium,Solid Fill,8,Triangle,Small,Solid Fill,0.298,0.097\n" +
"19,Random,6,6,Square,Medium,Solid Fill,3,Triangle,Small,Solid Fill,0.399,0.399\n" +
"19,Random,7,7,Triangle,Large,No Fill,9,Triangle,Small,Solid Fill,0.802,0.702\n" +
"19,Random,8,8,Triangle,Small,No Fill,7,Triangle,Small,No Fill,0.903,0.903\n" +
"19,Random,9,9,Circle,Large,No Fill,4,Circle,Medium,Solid Fill,0.5,0.802\n" +
"19,Random,10,10,Square,Medium,No Fill,10,Triangle,Medium,Solid Fill,0.702,0.601\n" +
"20,Random,1,1,Circle,Small,No Fill,4,Triangle,Medium,No Fill,0.601,0.298\n" +
"20,Random,2,2,Square,Large,No Fill,8,Circle,Medium,Solid Fill,0.097,0.802\n" +
"20,Random,3,3,Circle,Large,No Fill,6,Square,Small,No Fill,0.298,0.92\n" +
"20,Random,4,4,Square,Large,Solid Fill,5,Circle,Medium,No Fill,0.5,0.399\n" +
"20,Random,5,5,Square,Medium,No Fill,2,Triangle,Medium,Solid Fill,0.92,0.198\n" +
"20,Random,6,6,Triangle,Small,No Fill,1,Triangle,Large,Solid Fill,0.399,0.702\n" +
"20,Random,7,7,Circle,Small,No Fill,7,Square,Small,No Fill,0.702,0.601\n" +
"20,Random,8,8,Circle,Large,Solid Fill,10,Triangle,Medium,Solid Fill,0.802,0.097\n" +
"20,Random,9,9,Triangle,Large,Solid Fill,9,Triangle,Large,No Fill,0.903,0.5\n" +
"20,Random,10,10,Triangle,Small,Solid Fill,3,Triangle,Large,No Fill,0.198,0.903\n";