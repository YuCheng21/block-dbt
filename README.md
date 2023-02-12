# 基於區塊鏈的雙盲測驗平台

## Overview

[基於區塊鏈的雙盲試驗平台](https://www.grb.gov.tw/search/planDetail?id=14508043)

## Docker (Production)

### Configuration

- 配置環境變數，編輯檔案 `./docker/config.env`。

    ```text
    SECRET_KEY=<secret-key>
    ```
  
  - secret-key : flask session 的金鑰

### Startup

使用 Docker 建立容器啟動系統。

```bash
docker-compose up -d
```

預設將啟動以下連接埠 :

- `20080` : HTTP
