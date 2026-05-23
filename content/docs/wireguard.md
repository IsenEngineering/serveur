+++
date = '2026-03-01T13:39:01+09:00'
title = 'Wireguard et DNS'
tags = ["wireguard", "gestion"]
author = "Loshido"
+++

[Mise en place du réseau](/inf/wg-dns)

## Configuration Wireguard

Pour configurer le réseau Wireguard, vous devez être sudoer.
Vous trouverez un script permettant d'ajouter, de retirer et de lister les clés du réseau dans le répértoire `/root`

## Configuration DNSmasq

La configuration de DNSmasq se situe dans `/etc`

La configuration globale est dans `/etc/dnsmasq.conf`
mais la configuration spécifique au réseau Wireguard est à l'emplacement ci-contre.

```conf {filename="/etc/dnsmasq.d/wg.conf"}
interface=wg0
listen-address=10.66.66.1
bind-interfaces

domain=wg.ie

address=/.wg.ie/10.66.66.1
```