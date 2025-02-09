## 参考サイト

https://zenn.dev/kumassy/books/6e518fe09a86b2

## プロジェクト作成手順

```bash
irm https://create.tauri.app/ps | iex
```

````bash
bun install
```

```bash
bun tauri dev
````

## V2

サイト内は V1 の API を使っているため、V2 の API を使う場合は以下のサイトを見る。

https://v2.tauri.app/plugin/dialog/

https://v2.tauri.app/reference/javascript/dialog/

## プロセス間通信（IPC）

https://v2.tauri.app/concept/inter-process-communication/

https://v2.tauri.app/develop/calling-frontend/

少量のデータをストリームする必要がある場合や、プッシュ通知システムなどを実装する必要がある場合を想定して設計されています。

低レイテンシーや高スループットの状況向けに設計されていません。ストリーミング・データに最適化された実装については、チャンネルのセクションを参照してください。

Command と Event 主な違いは、イベントが強力な型をサポートしていないこと、イベントのペイロードが常に JSON 文字列であるため大きなメッセージに適していないこと、イベントデータとチャネルを細かく制御するケイパビリティシステムがサポートされていないことです。

AppHandle 型と WebviewWindow 型は、イベント・システムの特性である Listener と Emitter を実装しています。

### Event

Event は fire-and-forget の一方向 IPC メッセージで、ライフサイクルのイベントや状態の変更を伝えるのに最適なメッセージです。コマンドとは異なり、Event は Frontend と Tauri Core の両方から発行できます。

### Command

Tauri はまた、IPC メッセージの上に外部関数インターフェースのような抽象化を提供する。主要な API である invoke は、ブラウザの fetch API に似ており、Frontend が Rust 関数を呼び出したり、引数を渡したり、データを受け取ったりすることができます。
このメカニズムでは、リクエストとレスポンスをシリアライズするために JSON-RPC のようなプロトコルを使用するため、すべての引数とリターンデータは JSON にシリアライズ可能でなければなりません。
