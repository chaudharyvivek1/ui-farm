'use client';

import * as React from 'react';

import { Accordion, AccordionItem } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button, buttonStyles } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Skeleton, SkeletonText } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip } from '@/components/ui/tooltip';

const plans = [
  { label: 'Starter', value: 'starter' },
  { label: 'Growth', value: 'growth' },
  { label: 'Enterprise', value: 'enterprise' },
];

function DemoButton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button>Start a project</Button>
        <Button variant="secondary">Book a demo</Button>
        <Button variant="accent">Upgrade</Button>
        <Button variant="outline">Compare plans</Button>
        <Button variant="ghost">Cancel</Button>
        <Button variant="danger">Delete</Button>
      </div>
      <Separator />
      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button loading>Deploying</Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  );
}

function DemoBadge() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge>Default</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="accent">Accent</Badge>
        <Badge variant="success" dot>
          Active
        </Badge>
        <Badge variant="warning">Pending</Badge>
        <Badge variant="danger">Failed</Badge>
        <Badge variant="outline">Draft</Badge>
      </div>
      <div className="flex items-center gap-3">
        <h3 className="text-lg font-semibold">Orbit Desk</h3>
        <Badge variant="success" dot>
          Live
        </Badge>
      </div>
    </div>
  );
}

function DemoCard() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card interactive>
        <CardHeader>
          <Badge variant="primary">ERP</Badge>
          <CardTitle>Orbit ERP</CardTitle>
          <CardDescription>
            Inventory, payroll and reporting in one workspace for growing teams.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-[var(--muted)]">
            <li>Multi-branch stock control</li>
            <li>Attendance to payroll in one run</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button size="sm">Open module</Button>
          <Button size="sm" variant="ghost">
            Docs
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <Badge variant="accent">Sync</Badge>
          <CardTitle>Orbit Sync</CardTitle>
          <CardDescription>
            Two-way sync between your ERP, CRM and accounting stack.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Progress value={72} label="Records synced" showValue size="sm" />
          <p className="text-xs text-[var(--muted)]">Last run 4 minutes ago · 0 conflicts</p>
        </CardContent>
      </Card>
    </div>
  );
}

function DemoAlert() {
  return (
    <div className="space-y-3">
      <Alert>
        <AlertTitle>Scheduled maintenance</AlertTitle>
        <AlertDescription>
          The payroll module will be read-only on Sunday from 02:00 to 03:00 IST.
        </AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Payment received</AlertTitle>
        <AlertDescription>Invoice #INV-2041 was paid in full.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Trial ends in 3 days</AlertTitle>
        <AlertDescription>Add a payment method to keep your workspace active.</AlertDescription>
      </Alert>
      <Alert variant="danger">
        <AlertTitle>Could not save changes</AlertTitle>
        <AlertDescription>Check the highlighted fields and try again.</AlertDescription>
      </Alert>
    </div>
  );
}

function DemoAvatar() {
  return (
    <div className="space-y-5">
      <div className="flex items-end gap-3">
        <Avatar name="Vivek Chaudhary" size="sm" />
        <Avatar name="Priya Nair" tone="accent" size="md" status="online" />
        <Avatar name="Rahul Mehta" tone="muted" size="lg" status="away" />
        <Avatar name="Ananya Rao" size="md" status="offline" />
      </div>
      <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] p-3">
        <Avatar name="Vivek Chaudhary" status="online" />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">Vivek Chaudhary</p>
          <p className="truncate text-xs text-[var(--muted)]">Frontend developer · Ahmedabad</p>
        </div>
        <Badge variant="primary" className="ml-auto">
          Admin
        </Badge>
      </div>
    </div>
  );
}

function DemoSeparator() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-[var(--muted-foreground)]">Account details</p>
        <Separator className="my-4" />
        <p className="text-sm text-[var(--muted-foreground)]">Billing preferences</p>
      </div>
      <Separator label="or" />
      <div className="flex h-10 items-center gap-4 text-sm text-[var(--muted-foreground)]">
        <span>Monthly</span>
        <Separator orientation="vertical" />
        <span>Yearly</span>
      </div>
    </div>
  );
}

function DemoInput() {
  return (
    <div className="grid max-w-md gap-4">
      <div className="space-y-2">
        <Label htmlFor="demo-email" required hint="We reply within a day">
          Work email
        </Label>
        <Input id="demo-email" type="email" placeholder="you@company.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="demo-search">Search</Label>
        <Input
          id="demo-search"
          placeholder="Search invoices"
          startIcon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="size-4" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          }
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="demo-invalid">GSTIN</Label>
        <Input id="demo-invalid" invalid defaultValue="24ABCDE" />
        <p className="text-xs text-[var(--danger)]">Enter a valid 15-character GSTIN.</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="demo-disabled">Workspace ID</Label>
        <Input id="demo-disabled" disabled defaultValue="acme-9f2c" />
      </div>
    </div>
  );
}

function DemoTextarea() {
  return (
    <div className="max-w-md space-y-2">
      <Label htmlFor="demo-message" hint="Max 500 characters">
        Message
      </Label>
      <Textarea id="demo-message" placeholder="Tell us about the project…" />
    </div>
  );
}

function DemoSelect() {
  return (
    <div className="grid max-w-md gap-4">
      <div className="space-y-2">
        <Label htmlFor="demo-plan">Plan</Label>
        <Select id="demo-plan" options={plans} placeholder="Choose a plan" defaultValue="growth" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="demo-team">Team size</Label>
        <Select
          id="demo-team"
          defaultValue="11-50"
          options={[
            { label: '1-10 people', value: '1-10' },
            { label: '11-50 people', value: '11-50' },
            { label: '51-200 people', value: '51-200' },
            { label: '200+ people', value: '200+', disabled: true },
          ]}
        />
      </div>
    </div>
  );
}

function DemoSwitch() {
  return (
    <div className="max-w-md space-y-5">
      <Switch defaultChecked label="Email notifications" description="Daily digest at 09:00 IST." />
      <Switch label="Two-factor authentication" description="Require a code from your phone at sign-in." />
      <Switch size="sm" defaultChecked label="Compact rows" />
      <Switch disabled label="Audit log export" description="Available on the Enterprise plan." />
    </div>
  );
}

function DemoLabel() {
  return (
    <div className="grid max-w-md gap-5">
      <div className="space-y-2">
        <Label htmlFor="label-plain">Workspace name</Label>
        <Input id="label-plain" placeholder="Acme Retail" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="label-required" required>
          Billing email
        </Label>
        <Input id="label-required" type="email" placeholder="billing@acme.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="label-hint" hint="Optional">
          Internal note
        </Label>
        <Input id="label-hint" placeholder="Shown only to your team" />
      </div>
    </div>
  );
}

function DemoCheckbox() {
  return (
    <div className="max-w-md space-y-4">
      <Checkbox defaultChecked label="Include archived records" description="Adds rows that were hidden more than 90 days ago." />
      <Checkbox label="Email me a copy" />
      <Checkbox indeterminate label="Select all invoices" description="12 of 40 selected." />
      <Checkbox disabled label="Auto-approve refunds" />
    </div>
  );
}

function DemoAccordion() {
  return (
    <Accordion defaultValue="pricing" type="single">
      <AccordionItem value="pricing" title="How is pricing calculated?" subtitle="Per workspace, per month">
        Plans are billed per active user, with volume pricing above 50 seats. Annual billing
        takes 20% off the monthly rate.
      </AccordionItem>
      <AccordionItem value="migration" title="Can we migrate from spreadsheets?">
        Yes — import Excel or CSV files and map columns once. Historical payroll runs are
        preserved with their original approval trail.
      </AccordionItem>
      <AccordionItem value="security" title="Where is data stored?">
        Data stays in the region you choose at sign-up, encrypted at rest with per-tenant keys.
      </AccordionItem>
      <AccordionItem value="support" title="Do you offer onboarding?" disabled>
        Enterprise plans include a dedicated onboarding engineer.
      </AccordionItem>
    </Accordion>
  );
}

function DemoTabs() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="pt-4">
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          4 modules active · 128 employees synced · last export 2 hours ago.
        </p>
      </TabsContent>
      <TabsContent value="billing" className="pt-4">
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          Growth plan, billed annually. Next invoice ₹1,84,000 on 1 Jan 2027.
        </p>
      </TabsContent>
      <TabsContent value="team" className="pt-4">
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          12 members · 3 admins · 2 pending invites.
        </p>
      </TabsContent>
    </Tabs>
  );
}

function DemoDialog() {
  return (
    <Dialog>
      <DialogTrigger className={buttonStyles('danger', 'md')}>Delete workspace</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this workspace?</DialogTitle>
          <DialogDescription>
            Every project, invoice and audit record will be removed. This cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="demo-confirm">
            Type <span className="font-mono text-[var(--foreground)]">acme-9f2c</span> to confirm
          </Label>
          <Input id="demo-confirm" placeholder="acme-9f2c" />
        </div>
        <DialogFooter>
          <DialogClose className={buttonStyles('outline', 'sm')}>Cancel</DialogClose>
          <DialogClose className={buttonStyles('danger', 'sm')}>Delete workspace</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DemoTooltip() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Tooltip label="Delete project">
        <Button variant="outline" size="sm" aria-label="Delete project">
          Hover me
        </Button>
      </Tooltip>
      <Tooltip label="Shows below" side="bottom">
        <Button variant="ghost" size="sm">
          Bottom
        </Button>
      </Tooltip>
      <Tooltip label="Focus also reveals this">
        <a href="#top" className="text-sm text-[var(--primary)] underline underline-offset-4">
          Keyboard users
        </a>
      </Tooltip>
    </div>
  );
}

function DemoTable() {
  const rows = [
    { id: 'INV-2041', client: 'Meridian Retail', amount: '₹1,24,000', status: 'Paid' },
    { id: 'INV-2042', client: 'Kavya Textiles', amount: '₹86,500', status: 'Pending' },
    { id: 'INV-2043', client: 'Orbit Logistics', amount: '₹2,10,000', status: 'Paid' },
    { id: 'INV-2044', client: 'Sunrise Foods', amount: '₹42,000', status: 'Overdue' },
  ];
  const tone: Record<string, 'success' | 'warning' | 'danger'> = {
    Paid: 'success',
    Pending: 'warning',
    Overdue: 'danger',
  };

  return (
    <Table>
      <TableCaption>Invoices raised in October 2026.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Client</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-mono text-xs text-[var(--foreground)]">{row.id}</TableCell>
            <TableCell className="text-[var(--foreground)]">{row.client}</TableCell>
            <TableCell className="text-right tabular-nums">{row.amount}</TableCell>
            <TableCell>
              <Badge variant={tone[row.status]} dot>
                {row.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function DemoProgress() {
  return (
    <div className="max-w-md space-y-5">
      <Progress value={32} label="Importing records" showValue />
      <Progress value={68} label="Storage used" showValue tone="accent" />
      <Progress value={92} label="Quota" showValue tone="warning" />
      <Progress value={45} size="sm" />
      <Progress value={100} label="Deploy" showValue tone="success" />
    </div>
  );
}

function DemoSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card>
        <div className="flex items-center gap-3">
          <Skeleton variant="circle" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3.5 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
        <div className="mt-5">
          <SkeletonText lines={3} />
        </div>
      </Card>
      <Skeleton variant="card" />
    </div>
  );
}

const demos: Record<string, React.ComponentType> = {
  button: DemoButton,
  badge: DemoBadge,
  card: DemoCard,
  alert: DemoAlert,
  avatar: DemoAvatar,
  separator: DemoSeparator,
  input: DemoInput,
  textarea: DemoTextarea,
  select: DemoSelect,
  switch: DemoSwitch,
  checkbox: DemoCheckbox,
  label: DemoLabel,
  accordion: DemoAccordion,
  tabs: DemoTabs,
  dialog: DemoDialog,
  tooltip: DemoTooltip,
  table: DemoTable,
  progress: DemoProgress,
  skeleton: DemoSkeleton,
};

export function Demo({ slug }: { slug: string }) {
  const Component = demos[slug];
  if (!Component) {
    return (
      <p className="text-sm text-[var(--muted)]">
        No preview for this component yet — read the code tab for the full API.
      </p>
    );
  }
  return <Component />;
}

export default Demo;
