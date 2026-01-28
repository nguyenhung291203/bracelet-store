import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import CategorySidebar from "@/components/category/category-sidebar";
import { categoryApi } from "@/lib/api/category-api";

export default async function Page() {
  const { data: categories = [] } = await categoryApi.getAll();

  return (
    <div className="max-w-xs space-y-8">
      <CategorySidebar
        title="Mặt dây đá quý"
        categories={categories.splice(0, 10)}
        activeId="1"
      />
      <Tabs defaultValue="overview" className="w-100">
      <TabsList variant="line">
        <TabsTrigger value="overview">Sản phẩm mới</TabsTrigger>
        <TabsTrigger value="analytics">Sản phẩm hot</TabsTrigger>
        <TabsTrigger value="reports">Sản phẩm nổi bật</TabsTrigger>
        <TabsTrigger value="settings">Sản phẩm khuyến mại</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              View your key metrics and recent project activity. Track progress
              across all your active projects.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            You have 12 active projects and 3 pending tasks.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="analytics">
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>
              Track performance and user engagement metrics. Monitor trends and
              identify growth opportunities.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            Page views are up 25% compared to last month.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reports">
        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
            <CardDescription>
              Generate and download your detailed reports. Export data in
              multiple formats for analysis.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            You have 5 reports ready and available to export.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Manage your account preferences and options. Customize your
              experience to fit your needs.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            Configure notifications, security, and themes.
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
    </div>
  );
}
