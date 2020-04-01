# bvarga.dev

![build](https://github.com/warnyul/bvarga.dev/workflows/build/badge.svg) ![deploy](https://github.com/warnyul/bvarga.dev/workflows/deploy/badge.svg)

This repository contains my personal website. I want a small page with minimalt design. So, it is a static HTML page. To easy deployment it is embedded in a Nginx Docker image.

In the [docker-compose.yml](docker-compose.yml) I have defined an external `${DOCKER_STACK}_proxy` network, thus the service easily bindable to a public domain. But I recommend to use [Traefik proxy](https://github.com/warnyul/traefik-docker-compose), because I have configured that already.

## License

    Copyright 2020 Balázs Varga

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
