/** Short, copy-ready usage example for each component page. */
export const usage: Record<string, string> = {
  button: `import { Button } from '@/components/ui/button';

export function Actions() {
  return (
    <>
      <Button onClick={() => save()}>Save changes</Button>
      <Button variant="outline" size="sm">Cancel</Button>
      <Button variant="danger" loading={deleting}>Delete</Button>
    </>
  );
}`,

  badge: `import { Badge } from '@/components/ui/badge';

<Badge variant="success" dot>Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="outline">Draft</Badge>`,

  card: `import {
  Card, CardHeader, CardTitle, CardDescription,
  CardContent, CardFooter,
} from '@/components/ui/card';

<Card interactive>
  <CardHeader>
    <CardTitle>Orbit ERP</CardTitle>
    <CardDescription>Inventory, payroll and reporting.</CardDescription>
  </CardHeader>
  <CardContent>{/* body */}</CardContent>
  <CardFooter>
    <Button size="sm">Open module</Button>
  </CardFooter>
</Card>`,

  alert: `import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

<Alert variant="warning">
  <AlertTitle>Trial ends in 3 days</AlertTitle>
  <AlertDescription>Add a payment method to keep the workspace active.</AlertDescription>
</Alert>`,

  avatar: `import { Avatar } from '@/components/ui/avatar';

<Avatar name="Vivek Chaudhary" status="online" />
<Avatar src="/team/priya.jpg" name="Priya Nair" size="lg" tone="accent" />`,

  separator: `import { Separator } from '@/components/ui/separator';

<Separator />
<Separator label="or" />
<Separator orientation="vertical" className="h-6" />`,

  input: `import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

<div className="space-y-2">
  <Label htmlFor="email" required>Work email</Label>
  <Input id="email" type="email" placeholder="you@company.com" />
  <p className="text-xs text-[var(--muted)]">We reply within a day.</p>
</div>`,

  textarea: `import { Textarea } from '@/components/ui/textarea';

<Textarea
  rows={5}
  placeholder="Tell us about the project…"
  onChange={(event) => setMessage(event.target.value)}
/>`,

  select: `import { Select } from '@/components/ui/select';

<Select
  placeholder="Choose a plan"
  options={[
    { label: 'Starter', value: 'starter' },
    { label: 'Growth', value: 'growth' },
    { label: 'Enterprise', value: 'enterprise' },
  ]}
  onChange={(event) => setPlan(event.target.value)}
/>`,

  switch: `import { Switch } from '@/components/ui/switch';

const [notify, setNotify] = useState(true);

<Switch
  checked={notify}
  onCheckedChange={setNotify}
  label="Email notifications"
  description="Daily digest at 09:00 IST."
/>`,

  checkbox: `import { Checkbox } from '@/components/ui/checkbox';

<Checkbox
  defaultChecked
  label="Include archived records"
  description="Adds rows hidden more than 90 days ago."
/>

// "select all" header
<Checkbox indeterminate label="Select all" />`,

  label: `import { Label } from '@/components/ui/label';

<Label htmlFor="gstin" required hint="15 characters">
  GSTIN
</Label>`,

  accordion: `import { Accordion, AccordionItem } from '@/components/ui/accordion';

<Accordion type="single" defaultValue="pricing">
  <AccordionItem value="pricing" title="How is pricing calculated?" subtitle="Per seat, per month">
    Plans are billed per active user, with volume pricing above 50 seats.
  </AccordionItem>
  <AccordionItem value="security" title="Where is data stored?">
    Data stays in the region you choose at sign-up.
  </AccordionItem>
</Accordion>`,

  tabs: `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="billing">Billing</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">…</TabsContent>
  <TabsContent value="billing">…</TabsContent>
</Tabs>`,

  dialog: `import {
  Dialog, DialogTrigger, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter, DialogClose,
} from '@/components/ui/dialog';
import { buttonStyles } from '@/components/ui/button';

<Dialog>
  <DialogTrigger className={buttonStyles('danger')}>Delete workspace</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete this workspace?</DialogTitle>
      <DialogDescription>This cannot be undone.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose className={buttonStyles('outline', 'sm')}>Cancel</DialogClose>
      <DialogClose className={buttonStyles('danger', 'sm')}>Delete</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`,

  tooltip: `import { Tooltip } from '@/components/ui/tooltip';

<Tooltip label="Delete project" side="top">
  <button type="button" aria-label="Delete project">…</button>
</Tooltip>`,

  table: `import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption,
} from '@/components/ui/table';

<Table>
  <TableCaption>Invoices raised in October 2026.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {rows.map((row) => (
      <TableRow key={row.id}>
        <TableCell>{row.id}</TableCell>
        <TableCell className="text-right">{row.amount}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`,

  progress: `import { Progress } from '@/components/ui/progress';

<Progress value={68} label="Storage used" showValue tone="accent" />`,

  skeleton: `import { Skeleton, SkeletonText } from '@/components/ui/skeleton';

<Skeleton variant="circle" />
<Skeleton variant="card" />
<SkeletonText lines={3} />`,

  'text-input': `import { TextInput } from '@/components/ui/text-input';

// letters only, first letter of each word capitalised
<TextInput
  label="Full name"
  allowed="alpha"
  transform="capitalize-words"
  onValueChange={setName}
  placeholder="vivek chaudhary"
/>

// digits only, capped at six, with a counter
<TextInput label="OTP" allowed="digits" maxLength={6} showCount />`,

  'number-input': `import { NumberInput } from '@/components/ui/number-input';

// integer field with steppers and bounds
<NumberInput label="Quantity" min={1} max={99} stepper onValueChange={setQty} />

// float field, two decimals, unit shown inside
<NumberInput label="Weight" decimals={2} suffix="kg" thousandSeparator />

// 1,24,000 while blurred, raw digits while typing
<NumberInput label="Units sold" thousandSeparator />`,

  'currency-input': `import { CurrencyInput } from '@/components/ui/currency-input';

<CurrencyInput label="Invoice amount" onValueChange={setAmount} />

// refunds can go negative
<CurrencyInput label="Adjustment" allowNegative />`,

  'phone-input': `import { PhoneInput } from '@/components/ui/phone-input';

<PhoneInput label="Mobile number" onValueChange={setPhone} />
// onValueChange receives "9876543210"`,

  'password-input': `import { PasswordInput } from '@/components/ui/password-input';

<PasswordInput
  label="Password"
  showStrength
  autoComplete="new-password"
  onValueChange={setPassword}
/>`,

  'dropdown-menu': `import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

<DropdownMenu
  trigger={<Button variant="outline" size="sm">Options</Button>}
  sections={[
    {
      heading: 'Document',
      items: [
        { label: 'View', onClick: () => view() },
        { label: 'Duplicate', onClick: () => duplicate(), shortcut: '⌘D' },
      ],
    },
    {
      items: [
        { label: 'Archive', onClick: () => archive() },
        { label: 'Delete', onClick: () => remove(), danger: true, separatorBefore: true },
      ],
    },
  ]}
/>`,

  'data-table': `import { DataTable, type DataTableColumn } from '@/components/ui/data-table';

const columns: DataTableColumn<Invoice>[] = [
  { key: 'id', header: 'Invoice', sortable: true },
  { key: 'client', header: 'Client', sortable: true },
  { key: 'amount', header: 'Amount', type: 'currency', align: 'right', sortable: true },
  { key: 'due', header: 'Due', type: 'date', hideBelow: 'md' },
  { key: 'status', header: 'Status', type: 'badge', badgeTones: {
      Paid: 'success', Pending: 'warning', Overdue: 'danger',
  } },
];

<DataTable
  columns={columns}
  data={invoices}
  rowKey="id"
  caption="Invoices raised in October 2026."
  sortable
  pageSize={10}
  loading={isLoading}
  empty="No invoices yet."
  actions={[
    { label: 'View', onClick: (row) => open(row.id) },
    { label: 'Edit', onClick: (row) => edit(row.id) },
    { label: 'Delete', onClick: (row) => remove(row.id), danger: true },
  ]}
/>`,
};

export function getUsage(slug: string) {
  return usage[slug] ?? '';
}
