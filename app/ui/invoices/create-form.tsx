'use client';

import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createInvoice, State } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState: State = { message: null, errors: {} };

  const [state, formAction] = useActionState(createInvoice, initialState);

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
              defaultValue=""
              aria-describedby="customer-error"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm"
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
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

          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            aria-describedby="amount-error"
            className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm"
          />

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
              <input type="radio" name="status" value="pending" />
              Pending
            </label>

            <label>
              <input type="radio" name="status" value="paid" />
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

      {/* General message */}
      {state.message && (
        <p className="text-red-500 text-sm mt-4">{state.message}</p>
      )}

      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/invoices">Cancel</Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}