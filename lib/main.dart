import 'dart:io';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

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
  GlobalKey<FormState> formkey = GlobalKey();
  String serverresponse;
  TextEditingController usernamecontroller = TextEditingController();
  TextEditingController passwordcontroller = TextEditingController();
  String username, password;
  @override
  Widget build(BuildContext context) {
    return Form(
      key: formkey,
      child: Scaffold(
        appBar: AppBar(title: Text("nodejs testing")),
        body: Column(
          children: [
            Container(
                height: 100,
                width: 200,
                child: TextFormField(
                  controller: usernamecontroller,
                  onChanged: (val) {
                    setState(() {
                      username = val;
                    });
                  },
                )),
            Container(
                height: 100,
                width: 200,
                child: TextFormField(
                  controller: passwordcontroller,
                  onChanged: (val) {
                    setState(() {
                      password = val;
                    });
                  },
                )),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Center(
                child: Container(
                    height: 100,
                    width: 200,
                    child: RaisedButton(
                      onPressed: () async {
                        print("$username,$password");
                        final uri = Uri.parse(localhost());
                        http.Response response = await http.get(uri);
                        setState(() {
                          print("sending request");
                          serverresponse = response.body.toString();
                          print(serverresponse);
                        });
                        var client = http.Client();
                        final url = Uri.parse(localhost());
                        http.Response responses = await http.post(url, body: {
                          'username': username,
                          'password': password,
                        });
                      },
                      child: Text("send get request"),
                    )),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Center(
                child: Container(
                    height: 100,
                    width: 200,
                    child: RaisedButton(
                      onPressed: () async {
                        var client = http.Client();
                        final url = Uri.parse("${localhost()}/create");
                        http.Response response = await client.post(url, body: {
                          'name': username,
                          'password': password,
                        });
                        setState(() {
                          print("sending request");
                          serverresponse = response.body.toString();
                          print(serverresponse);
                        });
                      },
                      child: Text("send post request"),
                    )),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Center(
                child: Container(
                    height: 100,
                    width: 200,
                    child: RaisedButton(
                      onPressed: () async {
                        final uri = Uri.parse("${localhost()}/hello");
                        http.Response response = await http.get(uri);
                        setState(() {
                          print("sending request");
                          serverresponse = response.body.toString();
                          print(serverresponse);
                        });
                      },
                      child: Text("send hello"),
                    )),
              ),
            ),
          ],
        ),
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
