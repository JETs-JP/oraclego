--
-- Populate tables.
--
-- @author: hhayakawa_jp <hiroshi.hayakawa@oracle.com>
--

INSERT INTO ORACLEGO.STUFFS (
    ID,
    NAME,
    CATEGORY,
    DESCRIPTION,
    IMAGE,
    GEO_LOCATION,
    LATITUDE,
    LONGITUDE
) VALUES (
    1,
    'ウェスティンホテル東京',
    'accommodation',
    'ウェスティンホテル東京。Cloud Developer Day 2016の会場です。',
    '/images/1.jpg',
    MDSYS.SDO_GEOMETRY (
        2001,
        4326,
        MDSYS.SDO_POINT_TYPE (35.641754, 139.715566, NULL),
        NULL,
        NULL
    ),
    35.641754,
    139.715566
);

INSERT INTO ORACLEGO.STUFFS (
    ID,
    NAME,
    CATEGORY,
    DESCRIPTION,
    IMAGE,
    GEO_LOCATION,
    LATITUDE,
    LONGITUDE
) VALUES (
    2,
    'TSUTAYA恵比寿ガーデンプレイス店',
    'shop',
    '最新のブルーレイ・DVDやTSUTAYA限定の商品を数多く取り揃えております。',
    '/images/2.jpg',
    MDSYS.SDO_GEOMETRY (
        2001,
        4326,
        MDSYS.SDO_POINT_TYPE (35.641327, 139.714792, NULL),
        NULL,
        NULL
    ),
    35.641327,
    139.714792
);

INSERT INTO ORACLEGO.STUFFS (
    ID,
    NAME,
    CATEGORY,
    DESCRIPTION,
    IMAGE,
    GEO_LOCATION,
    LATITUDE,
    LONGITUDE
) VALUES (
    3,
    'ガストロノミー ジョエル・ロブション',
    'restaulant',
    'ロブション モダンフレンチの集大成を洗練されたサービスと共にお楽しみいただけます。',
    '/images/3.jpg',
    MDSYS.SDO_GEOMETRY (
        2001,
        4326,
        MDSYS.SDO_POINT_TYPE (35.641874, 139.714596, NULL),
        NULL,
        NULL
    ),
    35.641874,
    139.714596
);

INSERT INTO ORACLEGO.STUFFS (
    ID,
    NAME,
    CATEGORY,
    DESCRIPTION,
    IMAGE,
    GEO_LOCATION,
    LATITUDE,
    LONGITUDE
) VALUES (
    4,
    'ヱビスビール記念館',
    'museum',
    'ビールにまつわる情報を体験して学ぶことができる、ヱビスビール記念館です。',
    '/images/4.jpg',
    MDSYS.SDO_GEOMETRY (
        2001,
        4326,
        MDSYS.SDO_POINT_TYPE (35.643121, 139.714577, NULL),
        NULL,
        NULL
    ),
    35.643121,
    139.714577
);

INSERT INTO ORACLEGO.STUFFS (
    ID,
    NAME,
    CATEGORY,
    DESCRIPTION,
    IMAGE,
    GEO_LOCATION,
    LATITUDE,
    LONGITUDE
) VALUES (
    5,
    '恵比寿三越',
    'shop',
    '2016年内 休まず営業いたします。',
    '/images/5.jpg',
    MDSYS.SDO_GEOMETRY (
        2001,
        4326,
        MDSYS.SDO_POINT_TYPE (35.642574, 139.714255, NULL),
        NULL,
        NULL
    ),
    35.642574,
    139.714255
);

INSERT INTO ORACLEGO.STUFFS (
    ID,
    NAME,
    CATEGORY,
    DESCRIPTION,
    IMAGE,
    GEO_LOCATION,
    LATITUDE,
    LONGITUDE
) VALUES (
    6,
    'レッドハット（株）',
    'office',
    'Red Hatは、オープンソースエンタープライズITソリューションを牽引する世界有数のプロバイダーです。',
    '/images/6.jpg',
    MDSYS.SDO_GEOMETRY (
        2001,
        4326,
        MDSYS.SDO_POINT_TYPE (35.645578, 139.711043, NULL),
        NULL,
        NULL
    ),
    35.645578,
    139.711043
);

INSERT INTO ORACLEGO.STUFFS (
    ID,
    NAME,
    CATEGORY,
    DESCRIPTION,
    IMAGE,
    GEO_LOCATION,
    LATITUDE,
    LONGITUDE
) VALUES (
    7,
    '蟻月 恵比寿店',
    'restaulant',
    '蟻月はもつ鍋や水炊きを中心に、九州の美味しいものを厳選して提供しています。',
    '/images/7.jpg',
    MDSYS.SDO_GEOMETRY (
        2001,
        4326,
        MDSYS.SDO_POINT_TYPE (35.645943, 139.716825, NULL),
        NULL,
        NULL
    ),
    35.645943,
    139.716825
);

COMMIT;
