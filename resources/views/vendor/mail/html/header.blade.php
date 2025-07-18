@props(['url'])
<tr>
    <td class="header">
        <a href="{{ $url }}" style="display: inline-block;">
            @if (trim($slot) === 'Laravel')
                <img src="{{ public_path('assets/images/logo.webp') }}" class="logo" alt="iKids">
            @else
                {!! $slot !!}
            @endif
        </a>
    </td>
</tr>
