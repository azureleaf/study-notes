# Laravel Template

## Directive

Vue.js を使うなら、Blade のディレクティブはそんなに覚えなくて問題ないけど。以下くらいは抑えるべき

- @if / @elseif / @else
- @method('delete')
- @csrf
- @json(\$array)
- @verbatim
- @isset(\$records)
- @empty(\$records)
- @hasSection
- @uncless(Auth::check())
- @switch(\$i) / @case(1) / @case(2) / @default

## ページ構造関係の Directive

- @extends('layouts.app')
- @section('title', 'Page Title')
- @yield('content')
- @show
- @alert(['type' => 'danger'])
- @extends('layouts.app')
- @section('sidebar')
- @parent
- @component('alert')
- @componentFirst(['custom.alert', 'alert'])
- @slot('title')
- @include('view.name', ['some' => 'data'])
- @includeIf('view.name', ['some' => 'data'])
- @includeWhen($boolean, 'view.name', ['some' => 'data'])
- @includeFirst(['custom.admin', 'admin'], ['some' => 'data'])
- @each('view.name', $jobs, 'job')


## Directive (loops)
- @for
- @foreach ($users as $user)
  - PHP における foreach は、JavaScript の構文`for(member in members)`と違って複数形、単数形の順序なので紛らわしい
- @forelse / @empty
- @while
- @continue / @break

You can use \$loop to get iteration info

- \$loop->index
- \$loop->first

## Directive (Auth)

- @auth('admin')
- @guest('admin')

## Comment

- `{{-- This comment will not be present in the rendered HTML --}}`
  - This comment won't be shown in rendered HTML
- `<!-- This comment will not be present in the rendered HTML -->`
  - This comment will remain in the rendered HTML
