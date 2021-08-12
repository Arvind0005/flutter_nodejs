import 'dart:io';

import 'package:flutter/material.dart';
import 'package:http/http.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: HomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class HomePage extends StatefulWidget {
  HomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String serverresponse;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("nodejs testing")),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Center(
              child: Container(
                  height: 100,
                  width: 200,
                  child: RaisedButton(
                    onPressed: () async {
                      final uri = Uri.parse(localhost());
                      Response response = await get(uri);
                      setState(() {
                        print("sending request");
                        serverresponse = response.body.toString();
                        print(serverresponse);
                      });
                    },
                    child: Text("send request"),
                  )),
            ),
          )
        ],
      ),
    );
  }
}

localhost() {
  if (Platform.isAndroid) {
    return 'http://10.0.2.2:3000';
  } else {
    return "http://localhost:3000";
  }
}
