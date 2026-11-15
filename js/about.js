'use strict';

// Copy the branch address; show a manual fallback if clipboard access is unavailable.
$(function () {
    const $status = $('#address-copy-status');
    $('#copy-branch-address').on('click', async function () {
        const $button = $(this);
        const address = $('#branch-address').text().trim();
        $button.prop('disabled', true).attr('aria-busy', 'true');
        $status.text('');
        try {
            await navigator.clipboard.writeText(address);
            $status.text('Address copied.');
        } catch (error) {
            $status.text('Copy this address: ' + address);
        } finally {
            $button.prop('disabled', false).removeAttr('aria-busy');
        }
    });
});
