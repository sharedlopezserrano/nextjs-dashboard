'use client';

import { CustomerField, InvoiceForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateInvoice, State } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm;
  customers: CustomerField[];
}) {
  const initialState: State = { message: null, errors: {} };

  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);

  const [state, formAction] = useActionState(
    updateInvoiceWithId,
    initialState
  );

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Customer */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>

          <div className="relative">
            <select
              id="customer"
              name="customerId"
              defaultValue={invoice.customer_id}
              aria-describedby="customer-error"
              className="block w-full rounded-md border py-2 pl-10 text-sm"
            >
              <option value="" disabled>
                Select a customer
              </option>

              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>

            <UserCircleIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          </div>

          <div id="customer-error" aria-live="polite">
            {state.errors?.customerId?.map((error) => (
              <p key={error} className="text-red-500 text-sm mt-2">
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>

          <div className="relative">
            <input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              defaultValue={invoice.amount}
              aria-describedby="amount-error"
              className="block w-full rounded-md border py-2 pl-10 text-sm"
            />

            <CurrencyDollarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          </div>

          <div id="amount-error" aria-live="polite">
            {state.errors?.amount?.map((error) => (
              <p key={error} className="text-red-500 text-sm mt-2">
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Status */}
        <fieldset>
          <legend className="mb-2 text-sm font-medium">
            Set the invoice status
          </legend>

          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="status"
                value="pending"
                defaultChecked={invoice.status === 'pending'}
              />
              Pending
            </label>

            <label>
              <input
                type="radio"
                name="status"
                value="paid"
                defaultChecked={invoice.status === 'paid'}
              />
              Paid
            </label>
          </div>

          <div id="status-error" aria-live="polite">
            {state.errors?.status?.map((error) => (
              <p key={error} className="text-red-500 text-sm mt-2">
                {error}
              </p>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Mensaje general */}
      {state.message && (
        <p className="text-red-500 text-sm mt-4">{state.message}</p>
      )}

      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/invoices">Cancel</Link>
        <Button type="submit">Edit Invoice</Button>
      </div>
    </form>
  );
}