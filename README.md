# Fordítóprogramok

Egyetemi beadandó projekt Fordító programok tárgy gyakorlati kurzusára. (EKE).

## UI Project

Táblázatos elemző, módosítható inputtal, és táblázattal.

> Input: Elemezendő bemeneti szöveg.
> Delay: Elemzési parancsok közti késleltetés. Nagyobb delay = lassabb futás.

A táblázatban a program mindig highlight-olja azt a behelyettesítési szabályt, amit épp használ.
Lassabb futásnál jobban látható a megoldás menete.

### Használt technológiák:
* HTML
* CSS
* JavaScript

### Futtatás:
Böngészőben:

```
UI/index.html megnyítása egy modern böngészővel.
```

Parcel bundler:
Szükséges:
* https://nodejs.org/en/](https://nodejs.org/en/)
* npm

```
cd UI/
```
```
npm install -g parcel-bundler
```
```
parcel index.html
```
parancs futtatása után a [http://localhost:1234](http://localhost:1234) címen érhető el az app.

### Demo
[http://bmartin97.info/Forditoprogramok/](http://bmartin97.info/Forditoprogramok/)

### Bemutató videó

[![Táblázatos elemző](http://bmartin97.info/tablazatoselemzes.gif)](https://www.youtube.com/watch?v=k2Gpd5p9Qsc)

---

## Console Project

Rekurzív elemző konzolos alkalmazás.

### Használt technológiák:
* NodeJS

## Input beállítása, és az algoritmus elindítása. (Optional)
```javascript
recursiveWay.S("i+i*i+i*i+i#"); // Valid lesz
console.log(recursiveWay.Result);

recursiveWay.S("i)+i#"); // Errort fog dobni
console.log(recursiveWay.Result);
```

### Futtatás:
Futtatáshoz szükséges a legfrissebb [https://nodejs.org/en/](https://nodejs.org/en/) letöltése, és telepítése.

```
cd Console/
```

majd a konzolos program futtatása

```
node index.js
```

### Bemutató videó
[![Rekurzív elemző](http://bmartin97.info/rekurzivelemzo.gif)](https://www.youtube.com/watch?v=tz4gBU9FkII)
=======
