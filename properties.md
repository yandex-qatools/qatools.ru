---
layout: page
title: Properties
resource: true
github: properties
description: "System property enchantment"
---

## Maven Dependencies

Стабильная версия:

~~~ xml
<dependency>
    <groupId>ru.yandex.qatools.properties</groupId>
    <artifactId>properties-loader</artifactId>
    <version>1.4</version>
</dependency>
~~~


## Getting Started

Работу библиотеки легче всего продемонстрировать на несложном примере конфигурирования прокси.


### Project Structure

В примере будет использоваться стандартная стурктура директорий, которую декларирует maven:


~~~ bash
|-pom.xml
|-src
  |-test
      |-java
      |    |-ProxyProperties.java
      |-resources
           |-proxy.properties
~~~


### Property File Creation

Для начала, в ресурсах создаем файл `proxy.properties` для конфигурации прокси:

~~~ properties
proxy.host=proxy.yandex.ru
proxy.port=3133
proxy.use=false
~~~


### Property Class Creation

Далее, в исходниках создадим класс `ProxyProperties`, который имплементирует настройки прокси:

~~~
@Resource.Classpath("proxy.properties") //для иницализации класса будет использоваться файл proxy.poerties
public class ProxyProperties {

    public ProxyProperties() {
        PropertyLoader.populate(this); //инициализация полей класса значениями из файла
    }

    @Property("proxy.host") //ключ проперти, по которой переменной будет выставлено значение
    private String host;

    @Property("proxy.port") //ключ проперти, по которой переменной будет выставлено значение
    private int port;

    @Property("proxy.active") //ключ проперти, по которой переменной будет выставлено значение
    private boolean active;

    public String getHost() {
        return host;
    }

    public int getPort() {
        return port;
    }

    public boolean isActive() {
        return active;
    }
}
~~~

Если создавать проперти-файл вам не нужно, а вы хотите задать значения переменных по умолчанию в коде и при необходимости
перегружать их значениями из системных проперти, то просто не аннотируйте класс:

~~~
public class ProxyProperties {
    public ProxyProperties() {
        PropertyLoader.populate(this);
    }

    @Property("proxy.host")
    private String host = "localhost"; //определено дефолтное значение <localhost>
   ...
}
~~~