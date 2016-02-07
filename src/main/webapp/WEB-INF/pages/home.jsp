<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html>
<head>
  <title>Angular 2 QuickStart</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- 1. Load libraries -->
  <!-- IE required polyfills, in this exact order -->
  <script src="node_modules/es6-shim/es6-shim.min.js"></script>
  <script src="node_modules/systemjs/dist/system-polyfills.js"></script>

  <script src="node_modules/angular2/bundles/angular2-polyfills.js"></script>
  <script src="node_modules/systemjs/dist/system.src.js"></script>
  <script src="node_modules/rxjs/bundles/Rx.js"></script>
  <script src="node_modules/angular2/bundles/angular2.dev.js"></script>

  <!-- 2. Configure SystemJS -->
  <script>
    System.config({
      packages: {
        app: {
          format: 'register',
          defaultExtension: 'js'
        }
      }
    });
    System.import('app/main')
            .then(null, console.error.bind(console));
  </script>

</head>

<!-- 3. Display the application -->
<body>
<h1>From home.jsp in web-inf</h1>
<my-app>Loading...</my-app>
</body>

</html>
