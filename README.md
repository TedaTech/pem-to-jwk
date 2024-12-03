# pem-to-jwk
Converts PEM formatted keys to JWK

Uses [node-jose](https://github.com/cisco/node-jose) to convert PEM formatted crypto keys to [JWK](https://tools.ietf.org/html/rfc7517) format.

https://hub.docker.com/r/tedatech/pem-to-jwk/

## Options

```
$ docker run -i tedatech/pem-to-jwk:latest

Options:
      --version   Show version number                                  [boolean]
  -p, --public    Output public key only                               [boolean]
  -j, --jwks-out  Wrap output in a JWKS structure                      [boolean]
  -t, --pretty    Pretty-print the output JSON                         [boolean]
  -k, --kid       Set the Key ID (kid) parameter                        [string]
  -e, --extra     Additional key=value pairs to include                 [string]
  -f, --file      Input file to read the key from                       [string]
  -h, --help      Show help                                            [boolean]
```

## Sample usage with docker
```
> openssl ecparam -name secp384r1 -genkey -noout | docker run -i tedatech/pem-to-jwk:latest
{"kty":"EC","kid":"LlMxHk_9inau_uVWXNml7JijPYnICi8iaJBS8JiMgRc","crv":"P-384","x":"BJdH_VYdDAnwW7a1M1yKMIyyQW2gJnyoNKQ2GVAWbl5w-mwUSF58i4rK6t7HWgD6","y":"OyG13CVNkP_TjxhUH0U567mzY_CyyXneikv5AXiMHOT0xWUkS7IChm1mtLl50W-8","d":"eBYccpIgxYTwCJfYnm8vQBNX5BLo15plucJeLGg_6bCw4j7Z-qplo9y2GCCI_mNM"}
```

```
> openssl ecparam -name secp384r1 -genkey -noout | docker run -i tedatech/pem-to-jwk:latest --public --pretty
{
  "kty": "EC",
  "kid": "poTlaX5_RzO4okPyFn4yWfJKlTazLlQFv3s8wKWJ1mQ",
  "crv": "P-384",
  "x": "oNiu12z1eKmKB14rh4y_UCgvG4s9GJKdphTPMetGutcrvvIVPyjfs8FTfrVZ-13v",
  "y": "tboldX7-Iu5XfZwykR65FnWJu3AB5dx_VI677rvmSPb3uxQMzN9Y5A-EJyCe2uM9"
}
```

```
> docker run -i tedatech/pem-to-jwk:latest --pretty <<EOF
-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEAzremgrCTOkuP6TJwwx+tre/wngN7K0i++Cbno89MRcCO7rl/
FhCCNVdjnPTBDPMJLcOWNnBknIFlCRmep9Z+Q4hH/hnXsTCZ1TI2aBdApf8/Q7Ge
Fa7WWDxM0tbfkcZkUYLhsQeqQs3TT9/gz0+Bhm0Zd8x3lItChpyoP048Shd+pWF9
xGXKMO3Kz03+oF4XDb3TECFyN7iAvWlCbfOalfOd7TzNRVvasJeuHefzvLxJwnRE
2LdgwlCRLY5T1kg4cTBg6uiO/6XHUJlJqaX/WxpBt1usD1P/PIcTrBBYumlbYlXa
xNT49OybKPktRkw8t69zbzbD5D25EoOzkBTXWwIDAQABAoIBAQCWstnH0rQyPl3W
kngUN6bk89PFTiJfxrO5spsSF5CyFRPeQwq76iMSgffTt7Z5G0BoxXpfi4Y9djNS
9ANutfbsgpCBVROiUB0FiIqTTchKe48CaZ0mj4QhZSxYVF8+JZSCu9iOt1jPRL+1
Li/00jBJ8IUtibjvaKqB+fjJ1d4r4C5WHpCuP2C5h+X5uh54MN7OtkhCX4OP3ETJ
8/YmZKGFX941oxseuq7uPjdlwv2jKfwLlKVKjNebgM6HxGTAN9AKLQVGAqbgofj1
phLxDLWLFQhrUG3v2zM2r3mX1Ht2xWl+tuOlSBj6smQXUfj9CvsVqbT8uJyAm7uF
wrtqs/oxAoGBAPoRSnTw5fWIAWFqNE+fOCXeSisKWDxlOEwY2Mvy+K7UhPXZCZp9
sWXpx4Gf1kVVfhOw0qQ4UyehyZ6FCblj0OgQDFhnq1VfzvKJojkokPHmjV+4VCAy
LBa/HSwiDyjSG9Q+QsS16VNvFmKAsSQ3caKVIgcwc34oH4dzTkPXlxDTAoGBANOf
FekKy8HFyPABnRZ0QHch7rgI6pkDAn4oETcQWkVh87FeC55SCEqPPgI3VqD4KeRF
w2EtwGOgbQDPxzKry8u3Fh2TX4jP5H8v2ioVb/UBvespit6pvNQ4aCEfT6xBIzZp
xxVJKRJnL44IEe/j7eg3iq5pX6EuuUrYhjoPoUpZAoGBAPPf7QdC8GGV9BK26rFE
DBQSR67V9dtgs5izGqs8F/8Yz1qcAdui/WDwr1rhMKyJhd1aMvNo4t/hzqlEAYnF
qLTJAeEtqVAnkcHDLGwl/cWMHQ/eylxj0c+VLrQduz8KOY2x8pe4+QYfbms+KoOx
dqciXf8450l/g9ArSYasOG11AoGBAMWBCyTlo4ckvcVp7B9hviyxqadvAuxth60Q
XgjDJUzt/0+BU1yeeQiFKb1NwncXRZm7ln6jAZS5zCHeya278scdB/HwclAwnrQp
h/aQ7V2AE61fpzDqv8ZdIqoPG//LBz8od9qg3klDrnljhMIcOxToiXD//XVkMyDs
dlHH9qN5AoGATZEgKeyhcQk5OAQfwEfbWISNwr8JRsg78ZpqYhRzCC6OHjrC97Sl
AkUCmqG6ZF2LFL4yHZuXlq2V7NABC9h+sj7R9AMzwsWPbdsEfExfOopNE73VhwxZ
IDDYowvnrBOTzddvj6hqI6dDXc7d05l8MY+JzNdAMD+nT7VGqBvr6AE=
-----END RSA PRIVATE KEY-----
EOF
{
  "kty": "RSA",
  "kid": "lnZx2lNuR1I7SwlO9MeYn9hZbbwhf57DmKK5RSlEu-E",
  "n": "zremgrCTOkuP6TJwwx-tre_wngN7K0i--Cbno89MRcCO7rl_FhCCNVdjnPTBDPMJLcOWNnBknIFlCRmep9Z-Q4hH_hnXsTCZ1TI2aBdApf8_Q7GeFa7WWDxM0tbfkcZkUYLhsQeqQs3TT9_gz0-Bhm0Zd8x3lItChpyoP048Shd-pWF9xGXKMO3Kz03-oF4XDb3TECFyN7iAvWlCbfOalfOd7TzNRVvasJeuHefzvLxJwnRE2LdgwlCRLY5T1kg4cTBg6uiO_6XHUJlJqaX_WxpBt1usD1P_PIcTrBBYumlbYlXaxNT49OybKPktRkw8t69zbzbD5D25EoOzkBTXWw",
  "e": "AQAB",
  "d": "lrLZx9K0Mj5d1pJ4FDem5PPTxU4iX8azubKbEheQshUT3kMKu-ojEoH307e2eRtAaMV6X4uGPXYzUvQDbrX27IKQgVUTolAdBYiKk03ISnuPAmmdJo-EIWUsWFRfPiWUgrvYjrdYz0S_tS4v9NIwSfCFLYm472iqgfn4ydXeK-AuVh6Qrj9guYfl-boeeDDezrZIQl-Dj9xEyfP2JmShhV_eNaMbHrqu7j43ZcL9oyn8C5SlSozXm4DOh8RkwDfQCi0FRgKm4KH49aYS8Qy1ixUIa1Bt79szNq95l9R7dsVpfrbjpUgY-rJkF1H4_Qr7Fam0_LicgJu7hcK7arP6MQ",
  "p": "-hFKdPDl9YgBYWo0T584Jd5KKwpYPGU4TBjYy_L4rtSE9dkJmn2xZenHgZ_WRVV-E7DSpDhTJ6HJnoUJuWPQ6BAMWGerVV_O8omiOSiQ8eaNX7hUIDIsFr8dLCIPKNIb1D5CxLXpU28WYoCxJDdxopUiBzBzfigfh3NOQ9eXENM",
  "q": "058V6QrLwcXI8AGdFnRAdyHuuAjqmQMCfigRNxBaRWHzsV4LnlIISo8-AjdWoPgp5EXDYS3AY6BtAM_HMqvLy7cWHZNfiM_kfy_aKhVv9QG96ymK3qm81DhoIR9PrEEjNmnHFUkpEmcvjggR7-Pt6DeKrmlfoS65StiGOg-hSlk",
  "dp": "89_tB0LwYZX0ErbqsUQMFBJHrtX122CzmLMaqzwX_xjPWpwB26L9YPCvWuEwrImF3Voy82ji3-HOqUQBicWotMkB4S2pUCeRwcMsbCX9xYwdD97KXGPRz5UutB27Pwo5jbHyl7j5Bh9uaz4qg7F2pyJd_zjnSX-D0CtJhqw4bXU",
  "dq": "xYELJOWjhyS9xWnsH2G-LLGpp28C7G2HrRBeCMMlTO3_T4FTXJ55CIUpvU3CdxdFmbuWfqMBlLnMId7Jrbvyxx0H8fByUDCetCmH9pDtXYATrV-nMOq_xl0iqg8b_8sHPyh32qDeSUOueWOEwhw7FOiJcP_9dWQzIOx2Ucf2o3k",
  "qi": "TZEgKeyhcQk5OAQfwEfbWISNwr8JRsg78ZpqYhRzCC6OHjrC97SlAkUCmqG6ZF2LFL4yHZuXlq2V7NABC9h-sj7R9AMzwsWPbdsEfExfOopNE73VhwxZIDDYowvnrBOTzddvj6hqI6dDXc7d05l8MY-JzNdAMD-nT7VGqBvr6AE"
}
```

```
docker run -i danedmunds/pem-to-jwk:latest --public --pretty <<EOF
-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEAzremgrCTOkuP6TJwwx+tre/wngN7K0i++Cbno89MRcCO7rl/
FhCCNVdjnPTBDPMJLcOWNnBknIFlCRmep9Z+Q4hH/hnXsTCZ1TI2aBdApf8/Q7Ge
Fa7WWDxM0tbfkcZkUYLhsQeqQs3TT9/gz0+Bhm0Zd8x3lItChpyoP048Shd+pWF9
xGXKMO3Kz03+oF4XDb3TECFyN7iAvWlCbfOalfOd7TzNRVvasJeuHefzvLxJwnRE
2LdgwlCRLY5T1kg4cTBg6uiO/6XHUJlJqaX/WxpBt1usD1P/PIcTrBBYumlbYlXa
xNT49OybKPktRkw8t69zbzbD5D25EoOzkBTXWwIDAQABAoIBAQCWstnH0rQyPl3W
kngUN6bk89PFTiJfxrO5spsSF5CyFRPeQwq76iMSgffTt7Z5G0BoxXpfi4Y9djNS
9ANutfbsgpCBVROiUB0FiIqTTchKe48CaZ0mj4QhZSxYVF8+JZSCu9iOt1jPRL+1
Li/00jBJ8IUtibjvaKqB+fjJ1d4r4C5WHpCuP2C5h+X5uh54MN7OtkhCX4OP3ETJ
8/YmZKGFX941oxseuq7uPjdlwv2jKfwLlKVKjNebgM6HxGTAN9AKLQVGAqbgofj1
phLxDLWLFQhrUG3v2zM2r3mX1Ht2xWl+tuOlSBj6smQXUfj9CvsVqbT8uJyAm7uF
wrtqs/oxAoGBAPoRSnTw5fWIAWFqNE+fOCXeSisKWDxlOEwY2Mvy+K7UhPXZCZp9
sWXpx4Gf1kVVfhOw0qQ4UyehyZ6FCblj0OgQDFhnq1VfzvKJojkokPHmjV+4VCAy
LBa/HSwiDyjSG9Q+QsS16VNvFmKAsSQ3caKVIgcwc34oH4dzTkPXlxDTAoGBANOf
FekKy8HFyPABnRZ0QHch7rgI6pkDAn4oETcQWkVh87FeC55SCEqPPgI3VqD4KeRF
w2EtwGOgbQDPxzKry8u3Fh2TX4jP5H8v2ioVb/UBvespit6pvNQ4aCEfT6xBIzZp
xxVJKRJnL44IEe/j7eg3iq5pX6EuuUrYhjoPoUpZAoGBAPPf7QdC8GGV9BK26rFE
DBQSR67V9dtgs5izGqs8F/8Yz1qcAdui/WDwr1rhMKyJhd1aMvNo4t/hzqlEAYnF
qLTJAeEtqVAnkcHDLGwl/cWMHQ/eylxj0c+VLrQduz8KOY2x8pe4+QYfbms+KoOx
dqciXf8450l/g9ArSYasOG11AoGBAMWBCyTlo4ckvcVp7B9hviyxqadvAuxth60Q
XgjDJUzt/0+BU1yeeQiFKb1NwncXRZm7ln6jAZS5zCHeya278scdB/HwclAwnrQp
h/aQ7V2AE61fpzDqv8ZdIqoPG//LBz8od9qg3klDrnljhMIcOxToiXD//XVkMyDs
dlHH9qN5AoGATZEgKeyhcQk5OAQfwEfbWISNwr8JRsg78ZpqYhRzCC6OHjrC97Sl
AkUCmqG6ZF2LFL4yHZuXlq2V7NABC9h+sj7R9AMzwsWPbdsEfExfOopNE73VhwxZ
IDDYowvnrBOTzddvj6hqI6dDXc7d05l8MY+JzNdAMD+nT7VGqBvr6AE=
-----END RSA PRIVATE KEY-----
EOF
{
  "kty": "RSA",
  "kid": "lnZx2lNuR1I7SwlO9MeYn9hZbbwhf57DmKK5RSlEu-E",
  "n": "zremgrCTOkuP6TJwwx-tre_wngN7K0i--Cbno89MRcCO7rl_FhCCNVdjnPTBDPMJLcOWNnBknIFlCRmep9Z-Q4hH_hnXsTCZ1TI2aBdApf8_Q7GeFa7WWDxM0tbfkcZkUYLhsQeqQs3TT9_gz0-Bhm0Zd8x3lItChpyoP048Shd-pWF9xGXKMO3Kz03-oF4XDb3TECFyN7iAvWlCbfOalfOd7TzNRVvasJeuHefzvLxJwnRE2LdgwlCRLY5T1kg4cTBg6uiO_6XHUJlJqaX_WxpBt1usD1P_PIcTrBBYumlbYlXaxNT49OybKPktRkw8t69zbzbD5D25EoOzkBTXWw",
  "e": "AQAB"
}
```

## Sample usage with node command line

```
> node index.js --file:sample.pem --kid:my-key --public --pretty

{
  "kty": "RSA",
  "kid": "my-key",
  "n": "zremgrCTOkuP6TJwwx-tre_wngN7K0i--Cbno89MRcCO7rl_FhCCNVdjnPTBDPMJLcOWNnBknIFlCRmep9Z-Q4hH_hnXsTCZ1TI2aBdApf8_Q7GeFa7WWDxM0tbfkcZkUYLhsQeqQs3TT9_gz0-Bhm0Zd8x3lItChpyoP048Shd-pWF9xGXKMO3Kz03-oF4XDb3TECFyN7iAvWlCbfOalfOd7TzNRVvasJeuHefzvLxJwnRE2LdgwlCRLY5T1kg4cTBg6uiO_6XHUJlJqaX_WxpBt1usD1P_PIcTrBBYumlbYlXaxNT49OybKPktRkw8t69zbzbD5D25EoOzkBTXWw",
  "e": "AQAB"
}
```